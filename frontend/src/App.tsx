import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PROTECT_ROUTES, TRoutes } from "./constants";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Home, Login } from "./pages";
import { checkSessionStatus } from "./store/reducers/authReducer/actionCreators/checkSessionStatus";

function App() {
	const [routes, setRoutes] = useState<TRoutes[]>([]);
	const user = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!user) navigate("/login");
		if (user && user.role) setRoutes(PROTECT_ROUTES[user.role]);
	}, [user]);

	useEffect(() => {
		if (user) {
			dispatch(checkSessionStatus());
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				{routes.map(({ path, element }: TRoutes) => (
					<Route key={path} path={path} element={element} />
				))}
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
