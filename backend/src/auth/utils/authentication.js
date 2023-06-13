const db = require("../../index");
const { generateToken } = require("./token")

const authenticateUser = (email, password) => {
	const user = db.users.find((user) => user.email === email);
	if (user && user.password === password) {
		const token = generateToken(user);
		return { user, token };
	}

	throw new Error("Invalid email or password");
};

module.exports = { authenticateUser };
