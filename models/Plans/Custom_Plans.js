const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Custom_Plans = new Schema(
    {
        plan_id: mongoose.ObjectId,
        from: String,
        to: String,

        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Custom_Plans" }
);

module.exports = mongoose.model("Custom_Plans", Custom_Plans);
