const { buildSchema } = require("graphql");

// type User {
//   id: ID!
//   name: String!
//   phone: String!
//   email: String!
//   password: String!
//   role: String!

//   ...Assistant

//   ...Doctor
// }

// type Assistant {
//   doctors: [ID!]
// }
// type Doctor {
//   specialty: String
//   maxLength: Int
//   rums: [Int]
// }

//     ...Admin
//     ...Receptionist

const schema = buildSchema(`
  interface IUser {
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

  type User{
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

  type Rum {
    id: ID!
    name: String!
    users: [ID!]
    createdAt: Int!
    require: [Requirement!]!
  }

  type UserWithData{
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

  type Requirement {
    label: String!
    must: Boolean!
  }

  input UpdateUserInput {
    id: ID!
    name: String
    phone: String
    email: String
    password: String
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    getUsersByRole(role: String!): [User]
    getUsersByRoles(roles: [String!]!): [User!]!

    getUsersByRolesWithData(roles: [String!]!): [UserWithData]
    getRum(id: ID!): Rum
    getRums: [Rum!]!
    getRumsByIds(ids: [ID!]!): [Rum!]!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!

    createUser(input: CreateUserInput!): User!
    createRum(input: CreateRumInput!): Rum!

    deleteUserFromRum(rumId: ID!, userId: ID!): Rum
    updateDoctorLength(userId:ID!, maxLength: Int!): User!

    resetDoctorFromRums(userId:ID!): User!
    updateUser(input: UpdateUserInput!): User!

    updateRumRequire(rumId: ID!, require: [RequirementInput!]!): Rum
    deleteUser(userId: ID!): Boolean
    deleteRum(rumId: ID!): Boolean

    changeAssistantDoctorsList(assistantId: ID!, doctorId: ID!): User
  }

  input CreateUserInput {
    name: String!
    phone: String!
    email: String!
    password: String!
    role: String!
    doctors: [ID!]
  }

  input CreateRumInput {
    name: String!
    users: [ID!]!
    createdAt: Int!
    require: [RequirementInput!]!
  }

  input RequirementInput {
    label: String!
    must: Boolean!
  }

`);

module.exports = schema;
