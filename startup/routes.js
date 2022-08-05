const userRouter = require("../domain/user/user.routes");

module.exports = (app) => {
	app.use("/user", userRouter);
	app.use((req, res) => {
		res.status(404).send("Not found url");
	});
};
