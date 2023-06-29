import { useMutation } from "@apollo/client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { mutations } from "../../api/mutations";
import { CHANGE_ASSISTANT_DOCTORS_LIST } from "../../apollo-client/mutation";
import { capitalizeFirstLetter } from "../../helpers";
import { useAppSelector } from "../../hooks/redux";
import { usePopup } from "../../hooks/usePopup";
import { UserWithData } from "../../types";
import { Button } from "../Button";
import { DeleteForm } from "../DeleteForm";
import { EditUserForm } from "../EditUserForm";
import { Popup } from "../Popup";
import "./TableItem.scss";
import { useTableItemRows } from "./hooks/useTableItemRows";

type Props = { data: UserWithData; role: string; index?: number; refetch?: () => void };

export const TableItem = ({ data, role, index = 0, refetch }: Props) => {
	const { isOpen, onClose, onOpen } = usePopup();
	const { id: userId, role: userRole, doctors = [] } = useAppSelector((state) => state.auth.user);

	const [selectDoctor, setSelectDoctor] = useState<boolean>(doctors && doctors.includes(data.id));

	const [popups, setPopup] = useState<ReactNode>(null);
	const [popupTitle, setPopupTitle] = useState("");
	const [changeAssistantDoctorsList] = useMutation(CHANGE_ASSISTANT_DOCTORS_LIST);

	const editUser = useCallback(
		({ id, name, phone, email }: Partial<UserWithData>) => {
			setPopupTitle("Edit " + capitalizeFirstLetter(role));
			setPopup(<EditUserForm data={{ id, name, phone, email }} onClose={onClose} refetch={refetch} />);
			onOpen();
		},
		[onClose, onOpen, role],
	);

	const deleteUser = useCallback(
		({ id, role }: Partial<UserWithData>) => {
			setPopupTitle("Delete " + capitalizeFirstLetter(role || ""));
			setPopup(<DeleteForm data={{ id, role }} type={"user"} onClose={onClose} refetch={refetch} />);
			onOpen();
		},
		[onClose, onOpen],
	);

	const changeSelectDoctor = useCallback(() => {
		mutations(changeAssistantDoctorsList, {
			assistantId: userId,
			doctorId: data.id,
		});
		setSelectDoctor((prevSelectDoctor) => !prevSelectDoctor);
	}, [userId, data.id]);

	const assistantButton = useMemo(
		() => (
			<Button variant="table" className={selectDoctor ? "" : "active"} onClick={changeSelectDoctor}>
				{selectDoctor ? "Disconnect" : "Connect to"}
			</Button>
		),
		[changeSelectDoctor, data.id, selectDoctor],
	);

	const rows = useTableItemRows({
		data,
		role,
		userRole,
		editUser,
		deleteUser,
		assistantButton,
	});

	return (
		<div className={`table-body ${selectDoctor ? "active" : ""}`}>
			<div className="table-header">{index + 1}</div>
			<div className="table-data">
				{rows.map(({ label, value, className = "" }, i) => (
					<span key={label + i} className="table-item">
						<span className="table-item__label">{label}:</span>
						<span className={`table-item__value ${className}`}>{value}</span>
					</span>
				))}
			</div>
			<Popup isOpen={isOpen} onClose={onClose} title={popupTitle}>
				{popups}
			</Popup>
		</div>
	);
};
