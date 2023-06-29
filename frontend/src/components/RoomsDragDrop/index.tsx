import { HTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import { ComparisonResult, compareObjects } from "../../helpers";
import { TDoctorsList } from "../../types";
import { Button } from "../Button";
import { Popup } from "../Popup";
import { RumItem } from "../RumItem";
import "./RoomsDragDrop.scss";
import { useDnd } from "./hooks/useDnd";
import { useMutationHandlers } from "./hooks/useMutationHandlers";
import { usePopupActions } from "./hooks/usePopupActions";
import { useResize } from "./hooks/useResize";
import { useRoomsData } from "./hooks/useRoomsData";
import { GridId } from "./types";

type Props = HTMLAttributes<HTMLDivElement> & {
	doctorId?: string;
	doctors: TDoctorsList[];
};

const ItemWidth = 140;
const ItemsGap = 6;

const initialColumnWidths = {
	[GridId.GridSelect]: ItemWidth,
	[GridId.GridList]: ItemWidth,
};

export const RoomsDragDrop = forwardRef(({ doctorId = "", doctors }: Props, ref) => {
	const maxLength: number = doctors.find((doctor) => doctor.id == doctorId)?.maxLength || 0;
	const containerRef = useRef<HTMLDivElement>(null);
	const { rums, boxes, setBoxes, refetch, loading, error } = useRoomsData(doctorId);
	const { deleteUserFromRum, addUserInRum, delLoading, addLoading } = useMutationHandlers(doctorId, refetch);
	const { popups, popupTitle, isOpen, onClose, onCreate, onEdit, onDelete } = usePopupActions(rums, refetch);
	const { rowCount, containersHeight, handleResize } = useResize(
		containerRef,
		boxes,
		rums,
		initialColumnWidths,
		ItemsGap,
	);
	const { onChange } = useDnd(boxes, setBoxes, maxLength);

	useImperativeHandle(ref, () => ({
		saveRoomsChanges() {
			const localData = localStorage.getItem(doctorId) || "";
			const result: ComparisonResult = compareObjects(JSON.parse(localData), boxes);

			const addIds = result[GridId.GridSelect]?.map((id) => String(id));
			const delIds = result[GridId.GridList]?.map((id) => String(id));
			addUserInRum(addIds || []);
			deleteUserFromRum(delIds || []);
		},
	}));

	useEffect(() => {
		handleResize();
	}, [loading]);

	if (loading) {
		return <h2 className="center">Loading...</h2>;
	}

	if (error) {
		return <h2 className="center error">Error: {error.message}</h2>;
	}

	return (
		<div>
			<GridContextProvider onChange={onChange}>
				<div className="dnd-box" ref={containerRef}>
					<h2 className="dnd-box_title">
						{delLoading || addLoading || loading ? "Loading..." : "Drag and Drop rooms to the box"}
					</h2>
					<GridDropZone
						className="dnd-box_dnd"
						id={GridId.GridSelect}
						boxesPerRow={rowCount}
						rowHeight={ItemWidth + ItemsGap}
						style={containersHeight[GridId.GridSelect]}
					>
						{boxes[GridId.GridSelect].map((rum) => (
							<GridItem key={rum.id}>
								<RumItem data={rum} size="small" onEdit={onEdit} onDelete={onDelete} />
							</GridItem>
						))}
					</GridDropZone>
				</div>
				<div className="dnd-wrapper">
					<h2 className="dnd-title">Drag and Drop rooms to the box</h2>
					<Button variant={"plus"} onClick={onCreate}>
						Add a Room
					</Button>
				</div>
				<GridDropZone
					id={GridId.GridList}
					boxesPerRow={rowCount}
					rowHeight={ItemWidth + ItemsGap}
					style={containersHeight[GridId.GridList]}
				>
					{boxes[GridId.GridList].map((rum, i) => (
						<GridItem key={rum.id}>
							<RumItem data={rum} size="small" onEdit={onEdit} onDelete={onDelete} />
						</GridItem>
					))}
				</GridDropZone>
			</GridContextProvider>

			<Popup isOpen={isOpen} onClose={onClose} title={popupTitle}>
				{popups}
			</Popup>
		</div>
	);
});
