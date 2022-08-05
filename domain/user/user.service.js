const userModel = require("./user.model");
const jwt = require("jsonwebtoken");
const config = require("config");

async function registerUser({ email, username, password }) {
	try {
		const user = await userModel.create({ email, password, username });
		return user;
	} catch (error) {
		if (error.code === 11000) {
			const [key, value] = Object.entries(error.keyValue)[0];
			throw new Error(
				`user with ${key} "${value}" is already registered`
			);
		} else {
			throw new Error(error.message);
		}
	}
}

async function findUser(query) {
	return await userModel.findOne(query);
}

function generateTokens(payload) {
	const accessToken = jwt.sign(payload, config.get("jwtKey"), {
		expiresIn: "10h",
	});
	const refreshToken = jwt.sign(payload, config.get("jwtKey"), {
		expiresIn: "28d",
	});

	return { accessToken, refreshToken };
}

function refreshToken({ refreshToken }) {
	try {
		const payload = jwt.verify(refreshToken, config.get("jwtKey"));
	} catch (err) {}
}

module.exports = {
	generateTokens,
	refreshToken,
	registerUser,
	findUser,
};
