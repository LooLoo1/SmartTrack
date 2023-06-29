const mongoose = require("mongoose");

const authResponseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
		index: { expires: "1d" },
	}
});

const AuthResponse = mongoose.model("AuthResponse", authResponseSchema);

module.exports = AuthResponse;