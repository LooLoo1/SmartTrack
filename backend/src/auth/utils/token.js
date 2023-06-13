const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = ({ id, email }) => {
	const token = jwt.sign({ id, email }, JWT_SECRET);
	return token;
};

module.exports = { generateToken };
