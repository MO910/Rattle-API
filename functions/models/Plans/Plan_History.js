const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Plan_History = new Schema(
    {
        custom_plan_id: mongoose.ObjectId,
        student_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        amount_done: Number,
        grade: Number,

        rabt: Boolean,
        note: String,
        // date: Date,
        // rabt_amount_done: Number,
        // rabt_grade: Number,
    },
    { timestamps: true, collection: "Plan_History" }
);

module.exports = mongoose.model("Plan_History", Plan_History);
