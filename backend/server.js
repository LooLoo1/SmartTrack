const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/schema/schema");
const root = require("./src/resolvers");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const app = express();
app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	}),
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Сервер GraphQL запущено на порті ${PORT}`);
});
