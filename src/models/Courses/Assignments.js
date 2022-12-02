const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Assignments = new Schema(
    {
        subgroup_id: mongoose.ObjectId,
        note: String,
    },
    { timestamps: true, collection: "Assignments" }
);

module.exports = mongoose.model("Assignments", Assignments);
