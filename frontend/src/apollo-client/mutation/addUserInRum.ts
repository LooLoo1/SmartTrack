import { gql } from "@apollo/client";

export const ADD_USER_IN_RUM = gql`
	mutation AddUserInRum($rumId: ID!, $userId: ID!) {
		addUserInRum(rumId: $rumId, userId: $userId) {
			id
		}
	}
`;
