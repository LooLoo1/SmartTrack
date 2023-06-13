import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import { client } from "./apollo-client";
import "./index.scss";
import { setupStore } from "./store/store.ts";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</ApolloProvider>,
);
