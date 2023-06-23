import { gql } from "@apollo/client";

export const CREATE_RUM = gql`
	mutation CreateRum($input: CreateRumInput!) {
		createRum(input: $input){
			id
		}
	}

`;
