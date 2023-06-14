const db = require("../../index");
const { generateToken } = require("./token")

// const authenticateUser = (email, password) => {
// 	const user = db.users.find((user) => user.email === email);
// 	if (user && user.password === password) {
// 		const token = generateToken(user);
// 		return { user, token };
// 	}

// 	throw new Error("Invalid email or password");
// };

// module.exports = { authenticateUser };


const sessions = {}; // Об'єкт для зберігання сесій

const authenticateUser = (email, password) => {
  const user = db.users.find((user) => user.email === email);
  if (user && user.password === password) {
    const token = generateToken(user);
    // const token = generateSessionId();
    sessions[token] = { user };
    return { user, token };
  }

  throw new Error("Invalid email or password");
};

const verifyToken = (token) => {
  if (sessions.hasOwnProperty(token)) {
    return sessions[token].user;
  }

  throw new Error("Invalid session");
};

// Генерація унікального ідентифікатора сесії
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

module.exports = { authenticateUser, verifyToken };