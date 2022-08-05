module.exports = (app) => {
	require("./db")();
	require("./middlewares")(app);
	require("./routes")(app);
};
