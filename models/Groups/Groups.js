const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Groups = new Schema(
    {
        admin_id: mongoose.ObjectId,
        center_id: mongoose.ObjectId,
        teacher_ids: Array,
        title: String,
        working_days: Array,
        description: String,
    },
    { timestamps: true, collection: "Groups" }
);

module.exports = mongoose.model("Groups", Groups);
