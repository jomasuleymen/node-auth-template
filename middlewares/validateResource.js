module.exports = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync(req);
		return next();
	} catch (err) {
		return res.status(400).send(err.message);
	}
};
