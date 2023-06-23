import { gql } from "@apollo/client";

export const GET_DOCTORS_NAMES = gql`
	query getDoctorsNames($roles: [String!]!) {
		getUsersByRoles(roles: $roles) {
			id
			name
		}
	}
`;
