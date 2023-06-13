import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_DOCTORS_ROOMS } from "../../apollo-client/query";
import { RumItem } from "../../components/RumItem";
import { useAppSelector } from "../../hooks/redux";
import { Rum } from "../../types";
import "./DoctorWorkSpace.scss";

export const DoctorWorkSpace = () => {
	const { rums: rumsIds } = useAppSelector((state) => state.auth.user);

	const [rums, setRums] = useState<Rum[]>([]);
	const { loading, error, data } = useQuery(GET_DOCTORS_ROOMS, {
		variables: { ids: rumsIds },
	});

	useEffect(() => {
		if (data) {
			setRums(data.getRumsByIds);
		}
	}, [data]);

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	return (
		<section className="container work_space">
			{rums.map((rum) => (
				<RumItem key={rum.id} data={rum} size="large" />
			))}
		</section>
	);
};
