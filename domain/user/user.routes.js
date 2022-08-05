const {
	registerController,
	loginController,
	meController,
} = require("./user.controller");
const validateResource = require("../../middlewares/validateResource");
const { registerSchema, loginSchema } = require("./user.zodSchemas");
const auth = require("../../middlewares/auth");

const router = require("express").Router();

/*
    /user
*/

router.post("/register", validateResource(registerSchema), registerController);
router.post("/login", validateResource(loginSchema), loginController);
router.post("/me", auth, meController);

module.exports = router;
