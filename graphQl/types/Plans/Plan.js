const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
//
const history_type = require("./Plan_History"),
    history_schema = require("../../../models/Plans/Plan_History"),
    output_Custom_Plan = require("./output_Custom_Plan"),
    custom_plans_schema = require("../../../models/Plans/Custom_Plans");
// User Type
module.exports = new GraphQLObjectType({
    name: "Plans",
    fields: () => ({
        id: { type: GraphQLID },
        rabt_for_plan_id: { type: GraphQLID },
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
        custom: { type: GraphQLBoolean },
        custom_plans: {
            type: new GraphQLList(output_Custom_Plan),
            // type: GraphQLBoolean,
            async resolve({ id, custom }) {
                // if (!custom) return [];
                return await custom_plans_schema.find({ plan_id: id });
            },
        },
        history: {
            type: new GraphQLList(history_type),
            // async resolve({ id: plan_id }) {
            //     return await Plan_History.find({ plan_id });
            // },
        },
    }),
});
