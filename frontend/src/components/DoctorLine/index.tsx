import { useMutation, useQuery } from "@apollo/client";
import { HTMLAttributes, useEffect, useState } from "react";
import { mutations } from "../../api/mutations";
import { RESET_DOCTOR_RUMS, SET_DOCTOR_MAX_LENGTH } from "../../apollo-client/mutation";
import { GET_DOCTORS_ROOMS } from "../../apollo-client/query";
import { useCustomScroll } from "../../hooks";
import { TDoctor, Rum } from "../../types";
import { Button } from "../Button";
import { RumItem } from "../RumItem";
import "./DoctorLine.scss";
type Props = HTMLAttributes<HTMLDivElement> & {
	data: TDoctor;
};
export const DoctorLine = ({ data }: Props) => {
	const { id, name, maxLength, specialty, rums: ids } = data;
	const lineRef = useCustomScroll<HTMLDivElement>("horizontal");

	const [rums, setRums] = useState<Rum[]>([]);
	const [length, setLength] = useState<number>(0);
	const {
		loading,
		error,
		data: rumsData,
	} = useQuery(GET_DOCTORS_ROOMS, {
		variables: { ids },
	});

	const [updateDoctorLength] = useMutation(SET_DOCTOR_MAX_LENGTH);
	const [resetDoctorRums] = useMutation(RESET_DOCTOR_RUMS);

	const updateLength = async (newLength: number) => {
		const result = await mutations(updateDoctorLength, {
			userId: id,
			maxLength: newLength,
		});
		setLength(result.updateDoctorLength.maxLength);
	};

	const increment = () => {
		updateLength(length + 1);
	};

	const decrement = () => {
		updateLength(length - 1);
	};

	const reset = async () => {
		updateLength(0);

		const result = await mutations(resetDoctorRums, {
			userId: id,
		});
		setRums(result.resetDoctorFromRums.rums || []);
	};

	useEffect(() => {
		if (rumsData) {
			setRums(rumsData.getRumsByIds);
			setLength(maxLength);
		}
	}, [rumsData]);

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	return (
		<section className="item">
			<div className="item-head">
				<div className="top">
					<Button size="small" onClick={reset}>
						Reset
					</Button>
				</div>
				<div className="info">
					<h1>{name}</h1>
					<p>{specialty}</p>
				</div>

				<div className="control-item">
					<div className="control-length">
						<button type="button" onClick={decrement}>
							-
						</button>
						<span>{length}</span>
						<button type="button" onClick={increment}>
							+
						</button>
					</div>
					<p className="control-p">in line</p>
					<Button size="small" color="orange">
						Stop the line
					</Button>
				</div>
			</div>

			<div className="item-line" ref={lineRef}>
				{rums.map((rum) => (
					<RumItem key={rum.id} data={rum} />
				))}
			</div>
		</section>
	);
};
