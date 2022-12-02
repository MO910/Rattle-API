const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Courses = new Schema(
    {
        group_id: mongoose.ObjectId,
        title: String,
        description: String,
    },
    { timestamps: true, collection: "Courses" }
);

module.exports = mongoose.model("Courses", Courses);
