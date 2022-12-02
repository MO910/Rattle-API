const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} = require("graphql");
const Centers_Schema = require("../../models/Centers"),
    Center_type = require("../types/Center");
// Function
module.exports = {
    type: Center_type,
    args: {
        organization_id: { type: GraphQLID },
        admin_ids: { type: new GraphQLList(GraphQLID) },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Centers_Schema.create(args);
    },
};
