const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
} = require("graphql");
const Custom_Plans_Schema = require("../../../models/Plans/Custom_Plans"),
    Input_Custom_Plan = require("../../types/Plans/Input_Custom_Plan"),
    Output_Custom_Plan = require("../../types/Plans/output_Custom_Plan");
// Function
module.exports = {
    type: new GraphQLList(Output_Custom_Plan),
    args: {
        plan_id: { type: GraphQLID },
        custom_plans: { type: new GraphQLList(Input_Custom_Plan) },
    },
    async resolve(_, { plan_id, custom_plans }) {
        // delete the old days
        await Custom_Plans_Schema.deleteMany({ plan_id });
        // create all days
        custom_plans = custom_plans.map((c) => {
            c.plan_id = plan_id;
            return c;
        });
        return await Custom_Plans_Schema.create(custom_plans);
    },
};
