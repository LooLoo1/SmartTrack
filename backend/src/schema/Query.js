
const Query = `
	type Query {
		getUser(id: ID!): User
		getUsers: [User!]!
		getUsersByRole(role: String!): [User]
		getUsersByRoles(roles: [String!]!): [User!]!
		getUsersByRolesWithData(roles: [String!]!): [UserWithData]

		getRum(id: ID!): Rum
		getRums: [Rum!]!
		getRumsByIds(ids: [ID!]!): [Rum!]!
		checkSession(token: String!): AuthResponse
	}
`;

module.exports = Query;
