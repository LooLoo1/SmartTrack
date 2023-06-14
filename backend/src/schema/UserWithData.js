
const UserWithData = `
  type UserWithData {
    id: ID!
    name: String!
    phone: String!
    email: String!
    password: String!
    role: String!
    specialty: String
    maxLength: Int
    doctors: [UserWithData]
    rums: [Rum!]!
  }
`;

module.exports = UserWithData;
