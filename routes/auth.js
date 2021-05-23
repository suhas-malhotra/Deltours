const router = require("express").Router();
const auth = require("../controllers/users");
router.post("/register", auth.register);

router.get("/register", auth.seeRegister);

router.get("/login", auth.seeLogin);

router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
