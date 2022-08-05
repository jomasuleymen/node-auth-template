const logger = require("./utils/logger");
const express = require("express");
const http = require("http");

const app = express();

require("./startup")(app);

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
	logger.info(`Running on port ${port}`);
});
