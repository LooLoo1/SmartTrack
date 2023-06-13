import { gql } from "@apollo/client";

export const GET_TABLE_STUFF = gql`
	query getTableStuff($roles: [String!]!) {
		getUsersByRolesWithData(roles: $roles) {
			id
			name
			email
			phone
			role
			rums {
				id
				name
			}
			doctors {
				rums {
					id
					name
				}
			}
		}
	}
`;
