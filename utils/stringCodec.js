const encode64 = (str) => {
	return Buffer.from(str).toString("base64");
};

const decode64 = (encoded) => {
	return Buffer.from(encoded, "base64").toString("ascii");
};

module.exports = {
	encode64,
	decode64,
};
