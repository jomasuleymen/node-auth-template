const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, "Email address is required"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: [true, "Username is required"],
		min: [3, "min length of username is 3"],
		max: [16, "max length of username is 16"],
		match: [
			/^[a-z0-9]+$/i,
			"Username should contains only numbers and letters",
		],
	},
	password: {
		type: String,
		trim: true,
		required: [true, "Password is required"],
	},
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(8);
		this.password = await bcrypt.hash(this.password, salt);
	}

	next();
});

userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.safeData = function () {
	return _.omit(this.toJSON(), ["password", "__v"]);
};
module.exports = mongoose.model("User", userSchema);
