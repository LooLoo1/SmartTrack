import { gql } from "@apollo/client";

export const CHANGE_ASSISTANT_DOCTORS_LIST = gql`
	mutation ChangeAssistantDoctorsList($assistantId: ID!, $doctorId: ID!) {
		changeAssistantDoctorsList(assistantId: $assistantId, doctorId: $doctorId) {
			doctors
		}
	}
`;
