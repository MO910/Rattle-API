const Groups_schema = require("../../../models/Groups/Groups"),
    Courses_schema = require("../../../models/Courses/Courses"),
    Subgroups_schema = require("../../../models/Groups/Subgroups");
// getGroupFromStudentId
module.exports = async ({ id, group_id }) => {
    let groups = [];
    // *if not assigned to subgroup yet
    if (group_id) groups.push(await Groups_schema.findById(group_id));
    // *if teacher
    const isTeacher = await Groups_schema.findOne({ teacher_ids: id });
    if (isTeacher) groups.push(isTeacher);
    // *if student
    // get subgroup
    const subgroup = await Subgroups_schema.find({
        student_ids: id,
    });
    // get course
    const course = await Courses_schema.findById(
        subgroup?.[0]?._doc?.course_id
    );
    // get group
    const g = await Groups_schema.findById(course?.group_id);
    if (g) groups.push(g);
    return groups;
};
