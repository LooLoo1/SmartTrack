import { gql } from "@apollo/client";

export const CHECK_SESSION_QUERY = gql`
	query CheckSession($token: String!) {
		checkSession(token: $token) {
			user {
				id
				name
				phone
				email
				role
				doctors
				maxLength
				rums
			}
			token
		}
	}
`;
