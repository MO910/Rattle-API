const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");

const // Users
    // courses
    Courses_schema = require("../../../models/Courses/Courses"),
    Course_type = require("./Course");
//     // Goals
//     Goal_type = require("../Goals/Goal"),
//     Goals_schema = require("../../../models/Courses/Goals/Goals"),
// export Type
module.exports = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        // student_ids: { type: GraphQLID },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        // goals: {
        //     type: new GraphQLList(Goal_type),
        //     async resolve({ id: group_id }) {
        //         return await Goals_schema.find({
        //             group_id,
        //         });
        //     },
        // },
        // students: {
        //     type: new GraphQLList(User_type),
        //     async resolve({ student_ids }) {
        //         const students = await Promise.all(
        //             student_ids.map(async (studentId) => {
        //                 return await Users_schema.findById(studentId);
        //             })
        //         );
        //         return students;
        //     },
        // },
        courses: {
            type: new GraphQLList(Course_type),
            async resolve({ id: group_id }) {
                return await Courses_schema.find({ group_id });
            },
        },
    }),
});
