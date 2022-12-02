const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Plans = new Schema(
    {
        rabt_for_plan_id: mongoose.ObjectId,
        subgroup_id: mongoose.ObjectId,
        title: String,
        color: String,
        order_reversed: Boolean,

        from: Number,
        amount: Number,
        weeks: Number,

        rabt_amount: Number,

        working_days: Array,
        starting_at: Date,

        custom: Boolean,
        note: String,
    },
    { timestamps: true, collection: "Plans" }
);

module.exports = mongoose.model("Plans", Plans);
