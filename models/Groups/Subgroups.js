const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Subgroups = new Schema(
    {
        title: String,
        course_id: mongoose.ObjectId,
        student_ids: Array,
    },
    { timestamps: true, collection: "Subgroups" }
);

module.exports = mongoose.model("Subgroups", Subgroups);
