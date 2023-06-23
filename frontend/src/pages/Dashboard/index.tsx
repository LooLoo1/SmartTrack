import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_DOCTORS } from "../../apollo-client/query";
import { DoctorLine } from "../../components/DoctorLine";
import { Doctor, TDoctor } from "../../types";
import "./Dashboard.scss";

export const Dashboard = () => {
	const [doctors, setDoctors] = useState<TDoctor[]>([]);
	const { loading, error, data, refetch } = useQuery(GET_ALL_DOCTORS, {
		variables: { role: Doctor },
	});

	useEffect(() => {
		if (data) {
			setDoctors(data.getUsersByRole);
		}
	}, [data]);

	refetch()

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	if (doctors.length === 0) {
		return <h2 className="center">We don't have a Doctors...</h2>;
	}

	return (
		<section className="dashboard">
			{doctors.map((doctor) => (
				<DoctorLine key={doctor.id} data={doctor} />
			))}
		</section>
	);
};
