const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // User
    User_Schema = require("../../../models/Users/Users"),
    User_type = require("../../types/Users/User"),
    // rule convert function
    rulesConverter = require("../../types/shared/rulesConverter");
// Function
module.exports = {
    type: User_type,
    args: {
        id: { type: GraphQLID },
        group_id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        parent_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
        rules: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(_, args) {
        // extract id from rule title
        args.rule_ids = await rulesConverter({ rules: args.rules });
        return User_Schema.findByIdAndUpdate(args.id, args);
    },
};
