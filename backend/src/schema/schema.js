const { buildSchema } = require("graphql");
const typeDefs = require("./index");

const schema = buildSchema(typeDefs);

module.exports = schema;
