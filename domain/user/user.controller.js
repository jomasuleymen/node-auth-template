const { registerUser, generateTokens, findUser } = require("./user.service");
const { encode64 } = require("../../utils/stringCodec");

async function registerController(req, res) {
	try {
		const { email, username, password } = req.body;
		const user = await registerUser({ email, username, password });

		const safeUserData = user.safeData();
		return res.json(safeUserData);
	} catch (error) {
		return res.status(400).json(error.message);
	}
}

async function loginController(req, res) {
	try {
		const { email, password } = req.body;

		const user = await findUser({ email });
		if (!user) throw new Error("User not found");

		const isValidPassword = await user.isValidPassword(password);
		if (!isValidPassword) throw new Error("Password is wrong");

		const safeUserData = user.safeData();
		const { accessToken, refreshToken } = generateTokens(safeUserData);
		const encodedAccessToken = encode64(accessToken);
		const encodedRefreshToken = encode64(refreshToken);

		return res
			.header("Authorization", `Bearer ${encodedAccessToken}`)
			.status(201)
			.json({ refreshToken: encodedRefreshToken });
	} catch (error) {
		res.status(400).send(error.message);
	}
}

async function meController(req, res) {
	try {
		res.json(res.locals.user);
	} catch (error) {
		res.status(400).send(error.message);
	}
}

module.exports = {
	registerController,
	loginController,
	meController,
};
