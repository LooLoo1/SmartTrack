import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PROTECT_ROUTES, TRoutes } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { Icons } from "../Icon/Icons";
import "./NavBar.scss";

type Props = {
	className?: string;
};

export const NavBar = ({ className = "" }: Props) => {
	const [routes, setRoutes] = useState<TRoutes[]>([]);
	const user = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (user && user.role) setRoutes(PROTECT_ROUTES[user.role]);
	}, [user]);

	return (
		<ul className={`list ${className}`}>
			{routes.map(({ path }) => (
				<NavLink key={path} to={path} className={({ isActive }) => (isActive ? "active" : " default")}>
					<li>
						<Icons name={path} className="icon" color={"--color-white"} />
						<span>{path}</span>
					</li>
				</NavLink>
			))}
		</ul>
	);
};
