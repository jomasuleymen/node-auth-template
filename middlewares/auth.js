const { decode64 } = require("../utils/stringCodec");
const jwt = require("jsonwebtoken");
const config = require("config");

const authStartsWith = "Bearer ";
function auth(req, res, next) {
	try {
		const authHeader = req.headers["authorization"];

		if (!authHeader || !authHeader.startsWith(authStartsWith))
			throw new Error("Please authenticate");

		const encodedToken = authHeader.substring(authStartsWith.length);
		const token = decode64(encodedToken);

		const payload = jwt.verify(token, config.get("jwtKey"));
		if (!payload) throw new Error("Please authenticate");

		res.locals.user = payload;

		return next();
	} catch (error) {
		res.status(400).send(error.message);
	}
}

module.exports = auth;
