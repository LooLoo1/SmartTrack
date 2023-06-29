
const Mutation = `
	type Mutation {
		login(email: String!, password: String!): AuthResponse!

		createUser(input: CreateUserInput!): User!
		createRum(input: CreateRumInput!): Rum

		deleteUserFromRum(rumId: ID!, userId: ID!): Rum
		addUserInRum(rumId: ID!, userId: ID!): Rum
		updateDoctorLength(userId: ID!, maxLength: Int!): User!

		resetDoctorFromRums(userId: ID!): User!
		updateUser(input: UpdateUserInput!): User!

		updateRoomName(rumId: ID!, name: String!): Rum
		updateRumRequire(rumId: ID!, require: [RequirementInput!]!): Rum

		deleteUser(userId: ID!): Boolean
		deleteRum(rumId: ID!): Boolean

		changeAssistantDoctorsList(assistantId: ID!, doctorId: ID!): User
	}
`;

module.exports = Mutation;
