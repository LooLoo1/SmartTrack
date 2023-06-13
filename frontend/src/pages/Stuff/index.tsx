import { useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { GET_TABLE_STUFF } from "../../apollo-client/query";
import { Button } from "../../components/Button";
import { EditUserForm } from "../../components/EditUserForm";
import { Popup } from "../../components/Popup";
import { TableItem } from "../../components/TableItem";
import { STUFF } from "../../constants";
import { capitalizeFirstLetter, splitDataByRole } from "../../helpers";
import { useAppSelector } from "../../hooks/redux";
import { usePopup } from "../../hooks/usePopup";
import { UserWithData } from "../../types";
import "./Stuff.scss";

type TStuff = {
	[key: string]: UserWithData[];
};

export const Stuff = () => {
	const [stuff, setStuff] = useState<TStuff | null>(null);
	const [selectStuff, setSelectStuff] = useState(STUFF[0]);
	const { isOpen, onClose, onOpen } = usePopup();

	const { loading, error, data } = useQuery(GET_TABLE_STUFF, {
		variables: { roles: STUFF },
	});
	const { role: userRole } = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (data) {
			const splittedData = splitDataByRole<UserWithData>(data.getUsersByRolesWithData, STUFF);
			setStuff(splittedData);
		}
	}, [data]);

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	return (
		<section className="stuff">
			<nav className="stuff-nav">
				<div className="stuff-filters">
					{STUFF.map((role) => (
						<Fragment key={role}>
							<input
								id={role}
								type="radio"
								name="Stuff"
								value={role}
								checked={selectStuff === role}
								onChange={(e) => {
									setSelectStuff(e.target.value);
								}}
							/>
							<label htmlFor={role} className="stuff-label">
								{capitalizeFirstLetter(role) + "s"}
							</label>
						</Fragment>
					))}
				</div>

				{userRole === "admin" ? (
					<>
						<Button onClick={onOpen}>Add new</Button>
						<Popup isOpen={isOpen} onClose={onClose} title={`Add new ${capitalizeFirstLetter(selectStuff)}`}>
							<EditUserForm onClose={onClose} type="Create" />
						</Popup>
					</>
				) : null}
			</nav>
			<div className="table-container">
				{stuff &&
					stuff[selectStuff].map((user, i) => <TableItem key={user.id} data={user} role={selectStuff} index={i} />)}
			</div>
		</section>
	);
};
