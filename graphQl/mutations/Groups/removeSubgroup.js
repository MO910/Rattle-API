const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} = require("graphql");
const //subgroup
    Subgroups_Schema = require("../../../models/Groups/Subgroups"),
    Subgroup_type = require("../../types/Groups/Subgroup"),
    //course
    Courses_Schema = require("../../../models/Courses/Courses"),
    //group
    Groups_Schema = require("../../../models/Groups/Groups"),
    // user
    Users_Schema = require("../../../models/Users/Users");
// Subgroup_type = require("../../types/Groups/Subgroup");
// Function
module.exports = {
    type: Subgroup_type,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, { id }) {
        const subgroup = await Subgroups_Schema.findByIdAndDelete(id),
            course = await Courses_Schema.findById(subgroup.course_id);
        await Promise.all(
            subgroup.student_ids.map(async (studentId) => {
                return await Users_Schema.findByIdAndUpdate(studentId, {
                    group_id: course.group_id,
                });
            })
        );
        return subgroup;
    },
};
