import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
	cache: new InMemoryCache(),
});
