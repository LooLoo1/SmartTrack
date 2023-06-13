import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_DOCTORS } from "../../apollo-client/query";
import { DoctorLine } from "../../components/DoctorLine";
import { Doctor } from "../../types";
import "./Dashboard.scss";

export const Dashboard = () => {
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const { loading, error, data } = useQuery(GET_ALL_DOCTORS, {
		variables: { role: "doctor" },
	});

	useEffect(() => {
		if (data) {
			setDoctors(data.getUsersByRole);
		}
	}, [data]);

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

{
	/* <div style={{display: 'flex', alignItems: 'baseline', flexDirection: 'column', gap: '2rem'}}>
<Button size="small">Reset</Button>
<Button size="small" color="orange">Reset</Button>
<Button size="small">Stop the line</Button>
<Button size="medium">Sign In</Button>
<Button size="large">Sign In</Button>

<Button variant="text">Sign In</Button>
</div> */
}
