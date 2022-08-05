const { createLogger, format, transports } = require("winston");

const isProd = process.env.NODE_ENV === "production";

const logger = createLogger({
	exitOnError: false,
	exceptionHandlers: [
		new transports.File({ filename: "exceptions.log", dirname: "logs" }),
	],
});

const myFormat = format.combine(
	format.timestamp({
		format: "YYYY-MM-DD HH:mm:ss",
	}),
	format.errors({ stack: true }),
	format.metadata({
		fillExcept: ["timestamp", "level", "message", "stack"],
	}),
	format.printf(
		({ timestamp, level, message, stack, metadata }) =>
			`[${timestamp}] ${level}: ${stack || message} ${
				Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : ""
			}`
	)
);

/* adding transports */
if (isProd) {
	const filterOnly = (level) =>
		format((info) => (info.level === level ? info : false))();

	const levels = ["error", "warn", "info"];
	levels.forEach((level) => {
		logger.add(
			new transports.File({
				format: format.combine(filterOnly(level), myFormat),
				filename: `${level}Logs.log`,
				dirname: "logs",
				level,
			})
		);
	});
} else {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), myFormat),
		})
	);
}

module.exports = logger;
