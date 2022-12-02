const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
//
const Center_type = require("./Center"),
    Centers_schema = require("../../models/Centers");
// User Type
module.exports = new GraphQLObjectType({
    name: "Organization",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        centers: {
            type: new GraphQLList(Center_type),
            async resolve({ id: organization_id }) {
                return await Centers_schema.find({
                    organization_id,
                });
            },
        },
    }),
});
