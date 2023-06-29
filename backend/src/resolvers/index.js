const userResolvers = require("./userResolvers")
const rumResolvers = require("./rumResolvers")
const authResolvers = require("./authResolvers")

const root = {
	...userResolvers,
	...rumResolvers,
	...authResolvers,
};

module.exports = root;
