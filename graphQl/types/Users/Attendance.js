const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
// User Type
module.exports = new GraphQLObjectType({
    name: "Attendance",
    fields: () => ({
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        attendance_status: { type: GraphQLString },
        date: { type: GraphQLString },
        note: { type: GraphQLString },
    }),
});
