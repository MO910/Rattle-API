const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = require("graphql");
const History_Schema = require("../../../models/Plans/Plan_History");
// Function
module.exports = {
    type: GraphQLBoolean,
    args: {
        student_id: { type: GraphQLID },
        custom_plan_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        amount_done: { type: GraphQLInt },
        // date: { type: GraphQLString },
        grade: { type: GraphQLInt },
        rabt: { type: GraphQLBoolean },
        note: { type: GraphQLString },
    },
    async resolve(_, args) {
        // Update User record
        const exists = await History_Schema.findOneAndUpdate(
            {
                student_id: args.student_id,
                custom_plan_id: args.custom_plan_id,
                // date: new Date(args.date),
            },
            args
        );
        return !(!exists && !(await History_Schema.create(args)));
    },
};
