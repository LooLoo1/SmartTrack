import { HTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import { ComparisonResult, compareObjects } from "../../helpers";
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
};

const ItemWidth = 140;
const ItemsGap = 6;

const initialColumnWidths = {
	[GridId.GridSelect]: ItemWidth,
	[GridId.GridList]: ItemWidth,
};

export const RoomsDragDrop = forwardRef(({ doctorId = "" }: Props, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { rums, boxes, setBoxes, refetch, loading, error } = useRoomsData(doctorId);
	const { deleteUserFromRum, addUserInRum } = useMutationHandlers(doctorId);
	const { popups, popupTitle, isOpen, onClose, onCreate, onEdit, onDelete } = usePopupActions(rums, refetch);
	const { rowCount, containersHeight, handleResize } = useResize(
		containerRef,
		boxes,
		rums,
		initialColumnWidths,
		ItemsGap,
	);
	const { onChange } = useDnd(boxes, setBoxes);

	useImperativeHandle(ref, () => ({
		saveRoomsChanges() {
			const localData = localStorage.getItem(doctorId) || "";
			const result: ComparisonResult = compareObjects(JSON.parse(localData), boxes);

			result[GridId.GridSelect]?.forEach((id) => {
				addUserInRum(String(id));
			});

			result[GridId.GridList]?.forEach((id) => {
				deleteUserFromRum(String(id));
			});
			refetch();
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
					<GridDropZone
						className="dnd-box_dnd"
						id={GridId.GridSelect}
						boxesPerRow={rowCount}
						rowHeight={ItemWidth + ItemsGap}
						style={containersHeight[GridId.GridSelect]}
					>
						{boxes[GridId.GridSelect].map((rum, i) => (
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
