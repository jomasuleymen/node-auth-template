const logger = require("../utils/logger");
const mongoose = require("mongoose");
const config = require("config");

const dbConfig = config.get("dbConfig");

module.exports = () => {
	mongoose
		.connect(dbConfig.url, {
			dbName: dbConfig.dbName,
			user: dbConfig.user,
			pass: dbConfig.password,
		})
		.then(() => logger.info(`Connected to database ${dbConfig.url}`))
		.catch((err) => {
			logger.error(err.message, err);
		});
};
