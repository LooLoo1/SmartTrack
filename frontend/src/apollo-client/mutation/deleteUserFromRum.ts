import { gql } from "@apollo/client";

export const DELETE_USER_FROM_RUM = gql`
	mutation DeleteUserFromRum($rumId: ID!, $userId: ID!) {
		deleteUserFromRum(rumId: $rumId, userId: $userId) {
			id
		}
	}
`;
