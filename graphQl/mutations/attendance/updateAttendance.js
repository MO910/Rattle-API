const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // Attendance
    Attendances_Schema = require("../../../models/Users/Attendances"),
    Attendance_type = require("../../types/Users/Attendance");
// Function
module.exports = {
    type: GraphQLBoolean,
    args: {
        user_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        attendance_status: { type: GraphQLString },
        date: { type: GraphQLString },
        note: { type: GraphQLString },
    },
    async resolve(_, args) {
        // exists
        const exists = await Attendances_Schema.findOneAndUpdate(
            {
                user_id: args.user_id,
                date: args.date,
            },
            args
        );
        return !!(exists || (await Attendances_Schema.create(args)));
    },
};
