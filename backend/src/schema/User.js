
const User = `
  type User {
    id: ID!
    name: String!
    phone: String!
    email: String!
    password: String!
    role: String!
    doctors: [ID!]
    specialty: String
    maxLength: Int
    rums: [ID]
  }

  input UpdateUserInput {
    id: ID!
    name: String
    phone: String
    email: String
    password: String
  }

  input CreateUserInput {
    name: String!
    phone: String!
    email: String!
    password: String!
    role: String!
    doctors: [ID!]
  }

  type AuthResponse {
    user: User!
    token: String!
  }
`;

module.exports = User;
