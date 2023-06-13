import { gql } from "@apollo/client";

export const EDIT_USER = gql`
	mutation EditUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
			id
			name
			phone
			email
		}
	}
`;
