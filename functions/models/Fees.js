const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Fees = new Schema(
    {
        student_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        amount: Number,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Fees" }
);

module.exports = mongoose.model("Fees", Fees);
