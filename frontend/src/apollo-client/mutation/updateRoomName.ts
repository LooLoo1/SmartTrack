import { gql } from "@apollo/client";

export const UPDATE_ROOM_NAME = gql`
	mutation UpdateRoomName($rumId: ID!, $name: String!) {
		updateRoomName(rumId: $rumId, name: $name) {
			id
		}
	}
`;
