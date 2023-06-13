import { gql } from "@apollo/client";

export const RESET_DOCTOR_RUMS = gql`
	mutation resetDoctorRums($userId: ID!) {
		resetDoctorFromRums(userId: $userId) {
			rums
		}
	}
`;
