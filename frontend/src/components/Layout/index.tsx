import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PROTECT_ROUTES } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { Header } from "../Header";
import "./Layout.scss";
import { Doctor } from "../../types";

export const Layout = () => {
	const location = useLocation();
	const [toggle, setToggle] = useState(false);
	const role = useAppSelector((state) => state.auth.user?.role);
	const id = useAppSelector((state) => state.auth.user?.id);
	const style = role === Doctor ? "row" : "";
	const navStyle = toggle ? "active" : "";

	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (user && role && location.pathname == "/") {
			if (role === Doctor) navigate(`/${id}`);
			else if (role) navigate(`/${PROTECT_ROUTES[role][0].path}`);
		}
	}, [user]);

	useEffect(() => {
		setToggle(false);
	}, [location]);

	const click = () => {
		setToggle(!toggle);
	};

	const burger = <button type="button" className={`burger ${navStyle}`} onClick={click} />;

	return (
		<div className={`layout ${style}`}>
			<Header type={style} className={navStyle} burger={burger} />
			<Outlet />
		</div>
	);
};
