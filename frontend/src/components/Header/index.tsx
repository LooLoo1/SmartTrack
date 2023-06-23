import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/reducers/authReducer/authSlice";
import { Button } from "../Button";
import { LogOut } from "../Icon";
import { NavBar } from "../NavBar";
import "./Header.scss";

type Props = {
	type: string;
	className: string;
	burger?: ReactNode;
};

export const Header = ({ type, className = "", burger }: Props) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const outHandler = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<header className={`header ${type} ${className}`}>
			<div className="header-container">
				<h2 className="logo">LOGO</h2>
				<NavBar />
				<Button variant="out" leftChild={<LogOut color="--out-color" className="icon" />} onClick={outHandler}>
					Sign Out
				</Button>
				{burger}
			</div>
		</header>
	);
};
