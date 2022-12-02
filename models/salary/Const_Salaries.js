const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Const_Salaries = new Schema(
    {
        staff_member_id: mongoose.ObjectId,
        amount: Number,
        note: String,
    },
    { timestamps: true, collection: "Const_Salaries" }
);

module.exports = mongoose.model("Const_Salaries", Const_Salaries);
