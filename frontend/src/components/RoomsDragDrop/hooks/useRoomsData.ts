import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_RUMS } from "../../../apollo-client/query";
import { RumWithData } from "../../../types";
import { visualizeData } from "../helpers/visualizeData";
import { GridId, SortedDnd } from "../types";

export const useRoomsData = (doctorId: string) => {
	const [rums, setRums] = useState<RumWithData[]>([]);
	const [boxes, setBoxes] = useState<SortedDnd>({
		[GridId.GridSelect]: [],
		[GridId.GridList]: [],
	});

	const { loading, error, data, refetch } = useQuery(GET_ALL_RUMS);

	useEffect(() => {
		if (data && data.getRumsWithData) {
			setRums(data.getRumsWithData);
		}
	}, [data]);

	useEffect(() => {
		const vData = visualizeData(rums, doctorId);
		localStorage.setItem(doctorId, JSON.stringify(vData));
		setBoxes(vData);
	}, [doctorId, rums]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return { refetch, loading, error, rums, boxes, setBoxes };
};
