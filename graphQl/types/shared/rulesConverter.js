const Rules_schema = require("../../../models/Users/Rules");
// to do Type
module.exports = async ({ rules, rule_ids }) => {
    // from titles to ids
    if (rules) {
        rules = await Promise.all(
            rules.map(async (rule) => {
                return (await Rules_schema.find({ title: rule }))[0];
            })
        );
        return rules.map((r) => r._id.toString());
    }
    // from ids to rule obj
    if (rule_ids)
        return await Promise.all(
            rule_ids.map(async (rule_id) => {
                return await Rules_schema.findById(rule_id);
            })
        );
};
