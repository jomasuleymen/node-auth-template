const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

module.exports = (app) => {
	app.use(express.static(path.join(__dirname, "../", "public")));
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(express.json());
	app.use(helmet());
	app.use(cors());
};
