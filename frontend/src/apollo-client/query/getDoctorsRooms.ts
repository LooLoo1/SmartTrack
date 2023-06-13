import { gql } from "@apollo/client";

export const GET_DOCTORS_ROOMS = gql`
	query GetRums($ids: [ID!]!) {
		getRumsByIds(ids: $ids) {
			id
			name
			users
			createdAt
			require {
				label
				must
			}
		}
	}
`;
