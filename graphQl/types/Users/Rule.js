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
    name: "Rule",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        permissions: { type: GraphQLString },
    }),
});
