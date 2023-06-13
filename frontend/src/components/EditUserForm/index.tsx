import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { mutations } from "../../api/mutations";
import { CREATE_USER, EDIT_USER } from "../../apollo-client/mutation";
import { UserWithData } from "../../types";
import { Button } from "../Button";
import { Input } from "../Input";
import "./EditUserForm.scss";

type FormData = {
	name: string;
	phone: string;
	email: string;
	password: string;
	role: "doctor" | "assistant" | "receptionist";
};

type PropsEditUser = {
	data?: Partial<UserWithData>;
	onClose: () => void;
	type?: "Edit" | "Create";
};

export const EditUserForm = ({ data = {}, onClose, type = "Edit" }: PropsEditUser) => {
	const { id, name, phone, email, role = "assistant" } = data;
	const [editUser] = useMutation(EDIT_USER);
	const [createUser] = useMutation(CREATE_USER);
	const defaultValues = {
		defaultValues: {
			name: name || "",
			phone: phone || "",
			email: email || "",
			password: "",
		},
	};

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<FormData>({
		mode: "onBlur",
		...defaultValues,
	});

	const onSubmit = ({ name, phone, email, password }: FormData) => {
		if (type === "Create") {
			mutations(createUser, {
				input: {
					name,
					phone,
					email,
					password,
					role,
				},
			});
		}
		if (type === "Edit") {
			mutations(editUser, {
				input: {
					id,
					name,
					phone,
					email,
					password,
				},
			});
		}

		onClose();
	};

	return (
		<form className="user-form" onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Name"
				autoComplete="off"
				placeholder="Enter full name"
				{...register("name", {
					required: "Email is required",
					pattern: {
						value: /^[A-Za-z\s]+$/,
						message: "Invalid name format",
					},
				})}
				error={errors.name?.message}
			/>
			<Input
				label="Phone"
				autoComplete="off"
				placeholder="Enter phone"
				{...register("phone", {
					required: "Phone is required",
					pattern: {
						value: /^(\+\d{1,3}-\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\+\d{10}|\d{10})$/,
						message: "Invalid phone format",
					},
				})}
				error={errors.phone?.message}
			/>
			<Input
				label="Email"
				autoComplete="off"
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
				autoComplete="off"
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

			<Button type="submit" disabled={!isValid}>
				Save
			</Button>
		</form>
	);
};
