const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const Plan_type = require("../../types/Plans/Plan"),
    Plans_Schema = require("../../../models/Plans/Plans");
// Function
module.exports = {
    type: Plan_type,
    args: {
        rabt_for_plan_id: { type: GraphQLID },
        subgroup_id: { type: GraphQLID },
        title: { type: GraphQLString },
        color: { type: GraphQLString },
        order_reversed: { type: GraphQLBoolean },

        from: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        weeks: { type: GraphQLInt },

        rabt_amount: { type: GraphQLInt },

        working_days: { type: new GraphQLList(GraphQLInt) },
        starting_at: { type: GraphQLString },
        note: { type: GraphQLString },

        note: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Plans_Schema.create(args);
    },
};
