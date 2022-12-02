const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} = require("graphql");
const Subgroups_Schema = require("../../../models/Groups/Subgroups"),
    Subgroup_type = require("../../types/Groups/Subgroup");
// Function
module.exports = {
    type: Subgroup_type,
    args: {
        course_id: { type: GraphQLID },
        title: { type: GraphQLString },
        student_ids: { type: GraphQLID },
    },
    async resolve(_, args) {
        return await Subgroups_Schema.create(args);
    },
};
