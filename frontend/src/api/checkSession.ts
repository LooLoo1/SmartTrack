import { client } from "../apollo-client";
import { CHECK_SESSION_QUERY } from "../apollo-client/query";

export const checkSession = async (token: string) => {
	const { data } = await client.query({
		query: CHECK_SESSION_QUERY,
		variables: {
			token,
		},
	});
	return data.checkSession;
};
