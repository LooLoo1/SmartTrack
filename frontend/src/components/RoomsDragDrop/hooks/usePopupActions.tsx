import { ReactNode, useState } from "react";
import { usePopup } from "../../../hooks/usePopup";
import { RumWithData } from "../../../types";
import { DeleteForm } from "../../DeleteForm";
import { EditRoomForm } from "../../EditRoomForm";

type PopupActions = {
	popups: ReactNode;
	popupTitle: string;
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	onCreate: () => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

export const usePopupActions = (rums: RumWithData[], refetch: () => void): PopupActions => {
	const [popups, setPopup] = useState<ReactNode>(null);
	const [popupTitle, setPopupTitle] = useState("");
	const { isOpen, onClose, onOpen } = usePopup();

	const onCreate = () => {
		setPopupTitle("Add new Room");
		setPopup(<EditRoomForm type="Create" refetch={refetch} onClose={onClose} />);
		onOpen();
	};

	const onEdit = (id: string) => {
		setPopupTitle("Delete room");
		setPopup(
			<EditRoomForm
				data={{ id, name: rums.find((rum) => rum.id == id)?.name || "" }}
				refetch={refetch}
				onClose={onClose}
			/>,
		);
		onOpen();
	};

	const onDelete = (id: string) => {
		setPopupTitle("Delete room");
		setPopup(<DeleteForm data={{ id, role: "room" }} type={"room"} refetch={refetch} onClose={onClose} />);
		onOpen();
	};

	return { popups, popupTitle, isOpen, onClose, onOpen, onCreate, onEdit, onDelete };
};
