import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout";
import { IRoutes, PROTECT_ROUTES } from "./constants";
import { useAppSelector } from "./hooks/redux";
import { Home, Login } from "./pages";

function App() {
	const [routes, setRoutes] = useState<IRoutes[]>([]);
	const user = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate("/login");
		if (user && user.role) setRoutes(PROTECT_ROUTES[user.role]);
	}, [user]);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				{routes.map(({ path, element }: IRoutes) => (
					<Route key={path} path={path} element={element} />
				))}
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
