const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
//
const // User
    User_type = require("../Users/User"),
    Users_schema = require("../../../models/Users/Users"),
    // Subgroups
    subgroup_type = require("./Subgroup"),
    subgroups_schema = require("../../../models/Groups/Subgroups");
// User Type
module.exports = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        id: { type: GraphQLID },
        group_id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        floatingStudents: {
            type: new GraphQLList(User_type),
            async resolve({ id: course_id, group_id }) {
                const subgroups = await subgroups_schema.find({ course_id }),
                    // get an array of ids only
                    studentsInSubgroups = subgroups
                        .map((sub) => sub.student_ids)
                        .flat(),
                    allGroupStudents = await Users_schema.find({ group_id });
                // filter out the students who is already in subgroup
                return allGroupStudents.filter(
                    ({ id }) => !studentsInSubgroups.some((s_id) => s_id == id)
                );
            },
        },
        subgroups: {
            type: new GraphQLList(subgroup_type),
            async resolve({ id: course_id }) {
                return await subgroups_schema.find({
                    course_id,
                });
            },
        },
    }),
});
