const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Rules = new Schema(
    {
        title: String,
        permissions: String, // encoded like [parent, student, etc]
    },
    { timestamps: true, collection: "Rules" }
);

module.exports = mongoose.model("Rules", Rules);
