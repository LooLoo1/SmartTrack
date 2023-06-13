import { useMutation } from "@apollo/client";
import { mutations } from "../../api/mutations";
import { DELETE_USER } from "../../apollo-client/mutation";
import { UserWithData } from "../../types";
import { Button } from "../Button";
import "./DeleteUserForm.scss";

type PropsEditUser = {
	data: Partial<UserWithData>;
	onClose: () => void;
};

export const DeleteUserForm = ({ data, onClose }: PropsEditUser) => {
	const { id, role } = data;
	const [deleteUser] = useMutation(DELETE_USER);

	const onDelete = () => {
		mutations(deleteUser, { userId: id });
		onClose();
	};

	return (
		<div className="delete-form">
			<p>{`Are you sure you want to delete this ${role}?`}</p>
			<div className="delete-buttons">
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="text" onClick={onDelete}>
					Delete
				</Button>
			</div>
		</div>
	);
};
