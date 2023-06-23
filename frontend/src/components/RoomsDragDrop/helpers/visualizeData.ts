import { GridId, SortedDnd } from "../types";
import { RumWithData } from "../../../types";

export const visualizeData = (data: RumWithData[], userId: string) => {
	const result: SortedDnd = {
		[GridId.GridSelect]: [],
		[GridId.GridList]: [],
	};

	data.forEach((room) => {
		const user = room.users.find((u) => u.id == userId);
		const users = room.users.map((u) => u.name);

		if (user) {
			result[GridId.GridSelect].push({
				id: room.id,
				name: room.name,
				users,
			});
		} else {
			result[GridId.GridList].push({
				id: room.id,
				name: room.name,
				users,
			});
		}
	});


	return result;
};
