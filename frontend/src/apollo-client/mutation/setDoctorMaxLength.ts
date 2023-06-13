import { gql } from "@apollo/client";

export const SET_DOCTOR_MAX_LENGTH = gql`
	mutation SetDoctorMaxLength($maxLength: Int!, $userId: ID!) {
		updateDoctorLength(userId: $userId, maxLength: $maxLength) {
			maxLength
		}
	}
`;
