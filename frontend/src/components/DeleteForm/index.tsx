import { useMutation } from "@apollo/client";
import { mutations } from "../../api/mutations";
import { DELETE_RUM, DELETE_USER } from "../../apollo-client/mutation";
import { UserWithData } from "../../types";
import { Button } from "../Button";
import "./DeleteForm.scss";

type Props = {
	data: Partial<UserWithData>;
	onClose: () => void;

	type?: "user" | "room" | string;
	refetch?: () => void
};

export const DeleteForm = ({ data, onClose, type = "user", refetch }: Props) => {
	const { id, role } = data;
	const [deleteUser] = useMutation(DELETE_USER);
	const [deleteRum] = useMutation(DELETE_RUM);

	const onDelete = () => {
		if (type === "user") mutations(deleteUser, { userId: id });
		if (type === "room") mutations(deleteRum, { rumId: id });
		if (refetch) refetch()
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
