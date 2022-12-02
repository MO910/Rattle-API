const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // shared function
    getGroupFromStudentId = require("../shared/getGroupFromStudentId"),
    // Users
    Users_schema = require("../../../models/Users/Users"),
    //Attendance
    Attendance_type = require("./Attendance"),
    Attendances_schema = require("../../../models/Users/Attendances"),
    // rules
    Rule_type = require("./Rule"),
    Rules_schema = require("../../../models/Users/Rules"),
    // Plans
    Plan_type = require("../Plans/Plan"),
    Plans_schema = require("../../../models/Plans/Plans"),
    // Advancements
    Plan_History_type = require("../Plans/Plan_History"),
    Plans_History_schema = require("../../../models/Plans/Plan_History"),
    // rule convert function
    rulesConverter = require("../shared/rulesConverter");
// User Type
const User_type = new GraphQLObjectType({
    name: `User${~~(Math.random() * 1000)}`,
    fields: () => ({
        id: { type: GraphQLID },
        group_id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        parent_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLBoolean },
        phone: { type: GraphQLString },
        rule_ids: { type: new GraphQLList(GraphQLID) },
        rules: {
            type: new GraphQLList(Rule_type),
            async resolve({ rule_ids }) {
                return await rulesConverter({ rule_ids });
            },
        },
        groups: {
            type: new GraphQLList(Group_type),
            async resolve(args) {
                return await getGroupFromStudentId(args);
            },
        },
        subgroups: {
            type: new GraphQLList(Subgroup_type),
            async resolve({ id }) {
                return await Subgroups_schema.find({ student_ids: id });
            },
        },
        attendance_Date: { type: GraphQLString },
        attendance: {
            type: Attendance_type,
            async resolve(args) {
                let { id: user_id, attendance_Date } = args;
                return await Attendances_schema.findOne({
                    user_id,
                    date: attendance_Date,
                });
            },
        },
        plans_history: {
            type: new GraphQLList(Plan_History_type),
            async resolve({ id: student_id }) {
                return await Plans_History_schema.find({ student_id });
            },
        },
        plans: {
            type: new GraphQLList(Plan_type),
            async resolve({ id }) {
                return await Plans_schema.find({ subgroup_id: id });
            },
        },
        // children: {
        //     type: new GraphQLList(User_type),
        //     async resolve({ id, rule_ids }) {
        //         const parentRule = await rulesConverter({ rules: ["parent"] });
        //         if (!rule_ids?.some((r) => r == parentRule[0])) return;
        //         return await Users_schema.find({
        //             parent_id: id,
        //         });
        //     },
        // },
    }),
});
// export
module.exports = User_type;
// This is here to prevent circular dependencies problem which will lead to the formation of infinite loop
const // Groups
    Group_type = require("../Groups/Group"),
    Groups_schema = require("../../../models/Groups/Groups"),
    Courses_schema = require("../../../models/Courses/Courses"),
    // Subgroups
    Subgroup_type = require("../Groups/Subgroup"),
    Subgroups_schema = require("../../../models/Groups/Subgroups");
