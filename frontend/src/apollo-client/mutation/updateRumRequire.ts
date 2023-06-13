import { gql } from "@apollo/client";

export const UPDATE_RUM_REQUIRE = gql`
	mutation UpdateRumRequire($rumId: ID!, $require: [RequirementInput!]!) {
		updateRumRequire(rumId: $rumId, require: $require) {
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
