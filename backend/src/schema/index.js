const User = require("./User");
const Rum = require("./Rum");
const UserWithData = require("./UserWithData");
const Requirement = require("./Requirement");

const Query = require("./Query");
const Mutation = require("./Mutation");

const typeDefs = `
  ${User}
  ${Rum}
  ${UserWithData}
  ${Requirement}

  ${Query}
  ${Mutation}
`;

module.exports = typeDefs;
