const express = require("express"),
    router = express.Router(),
    {
        login,
        signup,
        verification,
        user,
        logout,
    } = require("../controllers/users");
// login
router.post("/login", login);
// signup
router.post("/signup", signup);
// user
router.get("/user", verification, user);
// logout
router.delete("/logout", logout);
// Export
module.exports = router;
