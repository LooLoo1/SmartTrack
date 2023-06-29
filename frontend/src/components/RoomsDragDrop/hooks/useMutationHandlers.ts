import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { mutations } from "../../../api/mutations";
import { ADD_USER_IN_RUM, DELETE_USER_FROM_RUM } from "../../../apollo-client/mutation";

export const useMutationHandlers = (doctorId: string, refetch: () => void) => {
	const [deleteUserFromRum, { loading: delLoading }] = useMutation(DELETE_USER_FROM_RUM);
	const [addUserInRum, { loading: addLoading }] = useMutation(ADD_USER_IN_RUM);

	const handleDeleteUserFromRum = useCallback(
		async (rumIds: string[]) => {
			try {
				for (const rumId of rumIds) {
					await mutations(deleteUserFromRum, {
						rumId: rumId,
						userId: doctorId,
					});
				}
				refetch()
			} catch (error) {
				console.error("Error deleting user from rum:", error);
			}
		},
		[deleteUserFromRum, doctorId],
	);

	const handleAddUserInRum = useCallback(
		async (rumIds: string[]) => {
			try {
				for (const rumId of rumIds) {
					await mutations(addUserInRum, {
						rumId,
						userId: doctorId,
					});
				}
				refetch()
			} catch (error) {
				console.error("Error added user to rums:", error);
			}
		},
		[addUserInRum, doctorId],
	);

	return { deleteUserFromRum: handleDeleteUserFromRum, addUserInRum: handleAddUserInRum, delLoading, addLoading };
};
