import { useQuery } from "@apollo/client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { GET_DOCTORS_NAMES } from "../../apollo-client/query";
import { Button } from "../../components/Button";
import { RoomsDragDrop } from "../../components/RoomsDragDrop";
import { Select } from "../../components/Select";
import { Doctor, TDoctorsList } from "../../types";
import "./Sequence.scss";

type DndRefType = {
	saveRoomsChanges: (maxLength?: number) => void;
};

const UserSelect = localStorage.getItem("UserSelect");

export const Sequence = () => {
	const placeholder = { id: "", name: "", maxLength: 0 };
	const option = UserSelect ? JSON.parse(UserSelect) : null;
	const [doctors, setDoctors] = useState<TDoctorsList[]>([]);
	const [selectedOption, setSelectedOption] = useState("Loading...");
	const [selectedId, setSelectedId] = useState("");

	const dndRef: MutableRefObject<DndRefType | null> = useRef(null);

	const { loading, error, data, refetch } = useQuery(GET_DOCTORS_NAMES, {
		variables: { roles: [Doctor] },
	});

	const options = doctors.map((doctor) => ({
		value: doctor.name,
		label: doctor.name,
	}));

	const handleOptionChange = (value: string) => {
		setSelectedOption(value);
		refetch()
		const { id, name } = doctors.find(({ name }) => name == value) || placeholder;
		if (id) {
			setSelectedId(String(id));
			localStorage.setItem("UserSelect", JSON.stringify({ id, name }));
		}
	};

	const handleSave = () => {
		if (dndRef.current) {
			dndRef.current.saveRoomsChanges();
		}
	};

	useEffect(() => {
		if (data && data.getUsersByRoles) {
			setDoctors(data.getUsersByRoles);
			if (option) {
				setSelectedOption(option.name);
				setSelectedId(option.id);
				return;
			}
			setSelectedOption(data.getUsersByRoles[0].name);
			setSelectedId(data.getUsersByRoles[0].id);
		}
	}, [data]);

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	return (
		<section className="sequence">
			<div className="sequence-header">
				<div className="sequence-select">
					<h2>Choose a Doctor</h2>
					<Select options={options} selectedValue={selectedOption} onChange={handleOptionChange} />
				</div>

				<Button onClick={handleSave}>Save</Button>
			</div>

			<RoomsDragDrop ref={dndRef} doctorId={selectedId} doctors={doctors}/>
		</section>
	);
};
