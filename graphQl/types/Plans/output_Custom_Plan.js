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
    name: "output_Custom_Plan",
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: GraphQLString },
        to: { type: GraphQLString },

        date: { type: GraphQLString },
        note: { type: GraphQLString },
    }),
});
