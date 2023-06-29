const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { User, AuthResponse } = require("../models");
require("dotenv").config({ path: ".env.local" });

const JWT_SECRET = process.env.JWT_SECRET;

const authResolvers = {
	login: async ({ email, password }) => {
		try {
			// Find the user by email in the database
			const user = await User.findOne({ email });

			if (!user) {
				throw new Error("Invalid email or password");
			}

			// Compare the password entered by the user with the hashed password in the database
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				throw new Error("Invalid email or password");
			}

			// Generate a JWT token
			const token = jwt.sign({ userId: user._id }, JWT_SECRET);

			const authResponse = new AuthResponse({
				user: user._id,
				token,
			});

			await authResponse.save();

			return { user, token };
		} catch (error) {
			console.error("Error logging in:", error);
			throw new Error("Failed to login");
		}
	},
	checkSession: async ({ token }) => {
		try {
			const authResponse = await AuthResponse.findOne({ token }).populate("user");
			if (!authResponse) {
				throw new Error("Invalid token");
			}

			return { user: authResponse.user, token };
		} catch (error) {
			console.error("Error checking session:", error);
			throw new Error("Failed to check session");
		}
	},
};

module.exports = authResolvers;
