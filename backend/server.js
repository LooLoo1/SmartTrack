const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./src/schema/schema");
const root = require("./src/resolvers");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

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
