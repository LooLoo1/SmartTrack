
const Rum = `
  type Rum {
    id: ID!
    name: String!
    users: [ID!]
    createdAt: Int!
    require: [Requirement!]!
  }

  type RumWithData {
    id: ID!
    name: String!
    users: [User!]
    createdAt: Int!
    require: [Requirement!]!
  }

  input CreateRumInput {
    name: String!
    users: [ID!]!
    require: [RequirementInput!]!
  }
`;

module.exports = Rum;
