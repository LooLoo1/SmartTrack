import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { LogOut } from "../../components/Icon";
import { Input } from "../../components/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login } from "../../store/reducers/authReducer/actionCreators";
import "./Login.scss";

type FormData = {
	email: string;
	password: string;
};

export const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
	} = useForm<FormData>({ mode: "onBlur" });

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

	const onSubmit = ({ email, password }: FormData) => {
		dispatch(login({ email, password }));
	};

	useEffect(() => {
		if (error) {
			setError("email", { message: error });
		}
		if (isAuthenticated) {
			navigate("/");
		}
	}, [error, navigate, setError, isAuthenticated]);

	return (
		<main className="container">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Email"
					placeholder="Enter your email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^\S+@\S+$/i,
							message: "Invalid email format",
						},
					})}
					error={errors.email?.message}
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Enter your password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password should be at least 8 long",
						},
					})}
					error={errors.password?.message}
				/>

				<Button type="submit" disabled={loading} leftChild={<LogOut className="icon" />}>
					{loading ? "Loading..." : "Login"}
				</Button>
			</form>
		</main>
	);
};
