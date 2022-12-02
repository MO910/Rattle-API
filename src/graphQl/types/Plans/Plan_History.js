const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const timestamps = require("../shared/timestamps");
// User Type
module.exports = new GraphQLObjectType({
    name: "Plan_History",
    fields: () => ({
        id: { type: GraphQLID },
        plan_id: { type: GraphQLID },
        custom_plan_id: { type: GraphQLID },
        student_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        amount_done: { type: GraphQLInt },
        grade: { type: GraphQLInt },

        rabt: { type: GraphQLBoolean },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        ...timestamps,
    }),
});
