import { gql } from "@apollo/client";

export const GET_ALL_DOCTORS = gql`
	query GetAllDoctors($role: String!) {
		getUsersByRole(role: $role) {
			id
			name
			specialty
			maxLength
			rums
		}
	}
`;
