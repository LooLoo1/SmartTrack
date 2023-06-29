const mongoose = require("mongoose");

const rumSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		createdAt: {
			type: Number,
			required: true,
		},
		require: [
			{
				label: {
					type: String,
					required: true,
				},
				must: {
					type: Boolean,
					required: true,
				},
			},
		],
	},
	{ versionKey: false },
);

const Rum = mongoose.model("Rum", rumSchema);

module.exports = Rum;
