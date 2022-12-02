const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = require("graphql");
const Organizations_Schema = require("../../models/Organizations"),
    Organization_type = require("../types/Organization");
// Function
module.exports = {
    type: Organization_type,
    args: {
        name: { type: GraphQLString },
        owner_id: { type: GraphQLID },
    },
    async resolve(_, args) {
        return await Organizations_Schema.create(args);
    },
};
