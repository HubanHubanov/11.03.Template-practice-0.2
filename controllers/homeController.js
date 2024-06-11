const router = require("express").Router();
const {isAuth} = require("../middlewares/authMiddleware")

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/authorised-test", isAuth, (req, res) => {
    res.send("User is authorised")
});

module.exports = router;