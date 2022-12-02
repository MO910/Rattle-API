const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Payments = new Schema(
    {
        const_salary_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        adjustment: Number,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Payments" }
);

module.exports = mongoose.model("Payments", Payments);
