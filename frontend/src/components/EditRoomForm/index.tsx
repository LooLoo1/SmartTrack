import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { mutations } from "../../api/mutations";
import { CREATE_RUM, UPDATE_ROOM_NAME } from "../../apollo-client/mutation";
import { RumWithData } from "../../types";
import { Button } from "../Button";
import { Input } from "../Input";
import "./EditRoomForm.scss";

type FormData = {
	name: string;
};

type PropsEditUser = {
	data?: Partial<RumWithData>;
	onClose: () => void;
	type?: "Edit" | "Create";
	refetch?: () => void;
};

export const EditRoomForm = ({ data = {}, onClose, type = "Edit", refetch }: PropsEditUser) => {
	const { id, name } = data;
	const [updateRoomName] = useMutation(UPDATE_ROOM_NAME);
	const [createRum] = useMutation(CREATE_RUM);
	const defaultValues = {
		defaultValues: {
			name: name || "",
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

	const onSubmit = ({ name }: FormData) => {
		if (type === "Create") {
			mutations(createRum, {
				input: {
					name,
					users: [],
					require: [],
					createdAt: String(Date.now())
				},
			});
		}
		if (type === "Edit") {
			mutations(updateRoomName, {
				rumId: id,
				name,
			});
		}
		if (refetch) refetch();
		onClose();
	};

	return (
		<form className="user-form" onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Name"
				autoComplete="off"
				placeholder="Enter name"
				{...register("name", {
					required: "Name is required",
					pattern: {
						value: /.+/,
						message: "Invalid name format",
					},
				})}
				error={errors.name?.message}
			/>

			<Button type="submit" disabled={!isValid}>
				Save
			</Button>
		</form>
	);
};
