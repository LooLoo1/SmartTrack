
const Rum = `
  type Rum {
    id: ID!
    name: String!
    users: [ID!]
    createdAt: Int!
    require: [Requirement!]!
  }

  input CreateRumInput {
    name: String!
    users: [ID!]!
    createdAt: Int!
    require: [RequirementInput!]!
  }
`;

module.exports = Rum;
