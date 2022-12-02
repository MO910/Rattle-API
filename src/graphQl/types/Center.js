const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const Group_type = require("./Groups/Group"),
    Groups_schema = require("../../models/Groups/Groups");
// User Type
module.exports = new GraphQLObjectType({
    name: "Center",
    fields: () => ({
        id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        admin_ids: { type: new GraphQLList(GraphQLID) },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        groups: {
            type: new GraphQLList(Group_type),
            async resolve({ id: center_id }) {
                return await Groups_schema.find({
                    center_id,
                });
            },
        },
    }),
});
