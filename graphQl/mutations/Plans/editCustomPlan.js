const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLObjectType,
} = require("graphql");
const Custom_Plans_Schema = require("../../../models/Plans/Custom_Plans"),
    Input_Custom_Plan = require("../../types/Plans/Input_Custom_Plan");
// Function
module.exports = {
    type: GraphQLBoolean,
    args: {
        custom_plan_id: { type: GraphQLID },
        newData: { type: Input_Custom_Plan },
    },
    async resolve(_, { custom_plan_id, newData }) {
        if (!newData)
            return !!(await Custom_Plans_Schema.findByIdAndDelete(
                custom_plan_id
            ));
        return !!(await Custom_Plans_Schema.findByIdAndUpdate(
            custom_plan_id,
            newData
        ));
    },
};
