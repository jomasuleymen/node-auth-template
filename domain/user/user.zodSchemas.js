const { z } = require("zod");

const registerSchema = z.object({
	body: z.object({
		email: z.string(),
		username: z.string(),
		password: z.string(),
	}),
});

const loginSchema = z.object({
	body: z.object({
		email: z.string(),
		password: z.string(),
	}),
});

module.exports = { loginSchema, registerSchema };
