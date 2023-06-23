import { gql } from "@apollo/client";

export const DELETE_RUM = gql`
	mutation DeleteRum($rumId: ID!) {
		deleteRum(rumId: $rumId)
	}
`;
