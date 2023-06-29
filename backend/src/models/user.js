const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		doctors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		specialty: {
			type: String,
		},
		maxLength: {
			type: Number,
		},
		rums: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Rum",
			},
		],
	},
	{ versionKey: false },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
