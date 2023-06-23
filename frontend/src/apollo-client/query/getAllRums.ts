import { gql } from "@apollo/client";

export const GET_ALL_RUMS = gql`
	query getAllRums {
		getRumsWithData {
			id
			name
			users {
				id
				name
			}
		}
	}
`;
