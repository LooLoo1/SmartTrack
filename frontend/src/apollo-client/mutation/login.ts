import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
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
