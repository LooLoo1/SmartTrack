import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { mutations } from "../../../api/mutations";
import { ADD_USER_IN_RUM, DELETE_USER_FROM_RUM } from "../../../apollo-client/mutation";

export const useMutationHandlers = (doctorId: string) => {
	const [deleteUserFromRum] = useMutation(DELETE_USER_FROM_RUM);
	const [addUserInRum] = useMutation(ADD_USER_IN_RUM);

	const handleDeleteUserFromRum = useCallback(
		(rumId: string) => {
			mutations(deleteUserFromRum, {
				rumId: rumId,
				userId: doctorId,
			});
		},
		[deleteUserFromRum, doctorId],
	);

	const handleAddUserInRum = useCallback(
		(rumId: string) => {
			mutations(addUserInRum, {
				rumId: rumId,
				userId: doctorId,
			});
		},
		[addUserInRum, doctorId],
	);

	return { deleteUserFromRum: handleDeleteUserFromRum, addUserInRum: handleAddUserInRum };
};
