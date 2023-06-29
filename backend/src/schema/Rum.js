const Rum = `
  type Rum {
    id: ID!
    name: String!
    users: [ID!]
    createdAt: String!
    require: [Requirement!]!
  }

  type RumWithData {
    id: ID!
    name: String!
    users: [User!]
    createdAt: String!
    require: [Requirement!]!
  }

  input CreateRumInput {
    name: String!
    users: [ID!]!
    require: [RequirementInput!]!
    createdAt: String!
  }
`;

module.exports = Rum;
