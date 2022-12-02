const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Attendances = new Schema(
    {
        user_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        attendance_status: String,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Attendances" }
);

module.exports = mongoose.model("Attendances", Attendances);
