const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
} = require("graphql");
const // user
    User_type = require("./types/Users/User"),
    Users_schema = require("../models/Users/Users"),
    Rules_schema = require("../models/Users/Rules"),
    // Attendance
    Attendance_type = require("./types/Users/Attendance"),
    Attendances_schema = require("../models/Users/Attendances"),
    // Plans
    Plan_Schema = require("../models/Plans/Plans"),
    Plan_type = require("./types/Plans/Plan"),
    Plan_History_Schema = require("../models/Plans/Plan_History"),
    Plan_History_type = require("./types/Plans/Plan_History"),
    Custom_Plans_Schema = require("../models/Plans/Custom_Plans"),
    // group
    Group_type = require("./types/Groups/Group"),
    Groups_schema = require("../models/Groups/Groups"),
    // Organization
    Organization_type = require("./types/Organization"),
    Organizations_schema = require("../models/Organizations"),
    // center
    Center_type = require("./types/Center"),
    Centers_schema = require("../models/Centers");
// mutations
const // Goals
    addPlan = require("./mutations/Plans/addPlan"),
    removePlan = require("./mutations/Plans/removePlan"),
    updatePlanHistory = require("./mutations/Plans/updateHistory"),
    spreadPlan = require("./mutations/Plans/spreadPlan"),
    editCustomPlan = require("./mutations/Plans/editCustomPlan"),
    // Users
    createUser = require("./mutations/Users/createUser"),
    updateUser = require("./mutations/Users/updateUser"),
    // rule convert function
    rulesConverter = require("./types/shared/rulesConverter"),
    // Center
    createCenter = require("./mutations/createCenter"),
    // Groups
    createSubgroup = require("./mutations/Groups/createSubgroup"),
    removeSubgroup = require("./mutations/Groups/removeSubgroup"),
    transportToSubgroup = require("./mutations/Groups/transportToSubgroup"),
    // attendance
    updateAttendance = require("./mutations/attendance/updateAttendance");
/*
    removeGoal = require("./mutations/Goals/removeGoal"),
    updateGoalsHistory = require("./mutations/Goals/updateHistory"),
    // Organization
    createOrganization = require("./mutations/createOrganization"),
    */
//
const query = new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            // get user info
            user: {
                type: new GraphQLList(User_type),
                args: {
                    id: { type: GraphQLID },
                    organization_id: { type: GraphQLID },
                    rules: { type: new GraphQLList(GraphQLString) },
                },
                async resolve(_, { id, organization_id, rules }) {
                    // get ids from rules titles
                    let rule_ids = rules && (await rulesConverter({ rules }));
                    rule_ids = rule_ids && { $in: rule_ids };
                    // filter the empty keys
                    let query = { _id: id, organization_id, rule_ids };
                    query = Object.entries(query).reduce((a, [k, v]) => {
                        v && (a[k] = v);
                        return a;
                    }, {});
                    // search and return
                    return await Users_schema.find(query);
                },
            },
            // get group attendance
            groupAttendanceAtDate: {
                type: new GraphQLList(User_type),
                args: {
                    group_id: { type: GraphQLID },
                    date: { type: GraphQLString },
                },
                async resolve(_, { group_id, date }) {
                    let students = await Users_schema.find({ group_id });
                    students = students.map((s) => {
                        s.attendance_Date = date;
                        return s;
                    });
                    return students;
                },
            },
            groups: {
                type: new GraphQLList(Group_type),
                args: { userId: { type: GraphQLID } },
                async resolve(_, { userId }) {
                    return await Groups_schema.find({ teacher_id: userId });
                },
            },
            organization: {
                type: Organization_type,
                args: { userId: { type: GraphQLID } },
                async resolve(_, { userId }) {
                    const user = await Users_schema.findById(userId);
                    return await Organizations_schema.findById(
                        user.organization_id
                    );
                },
            },
            subgroupHistoryAtDate: {
                type: new GraphQLList(Plan_History_type),
                args: {
                    subgroup_id: { type: GraphQLID },
                    date: { type: GraphQLString },
                },
                async resolve(_, { subgroup_id, date }) {
                    const $gte = new Date(date),
                        $lte = new Date(
                            new Date($gte).setDate($gte.getDate() + 1)
                        );
                    // get plans
                    const plans = await Plan_Schema.find({ subgroup_id }),
                        allHistories = await Promise.all(
                            plans.map(async (plan) => {
                                // get all custom plans in this date
                                let custom_plans =
                                    await Custom_Plans_Schema.find({
                                        plan_id: plan.id,
                                        date: { $gte, $lte },
                                    });
                                // get the history of these custom plans
                                return await Promise.all(
                                    await custom_plans.map(async (cp) => {
                                        let custom_history =
                                            await Plan_History_Schema.find({
                                                custom_plan_id: cp.id,
                                            });
                                        // add extra info
                                        return custom_history.map((h) => ({
                                            ...h._doc,
                                            plan_id: plan.id,
                                            date,
                                        }));
                                    })
                                );
                            })
                        );
                    return allHistories.flat().flat();
                },
            },
        },
    }),
    mutation = new GraphQLObjectType({
        name: "mutation",
        fields: {
            // users
            createUser,
            updateUser,
            // plans
            addPlan,
            updatePlanHistory,
            removePlan,
            spreadPlan,
            editCustomPlan,
            // centers
            createCenter,
            // groups
            createSubgroup,
            removeSubgroup,
            transportToSubgroup,
            // attendance
            updateAttendance,
        },
    });
// exports
module.exports = new GraphQLSchema({ query, mutation });
