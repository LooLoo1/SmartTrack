import { move, swap } from "react-grid-dnd";
import { GridId, SortedDnd } from "../types";

type ChangeDnd = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => void;

export const useDnd = (
	boxes: SortedDnd,
	setBoxes: React.Dispatch<React.SetStateAction<SortedDnd>>,
	maxLength?: number,
) => {
  const onChange: ChangeDnd = (sourceId, sourceIndex, targetIndex, targetId) => {
    const max = (maxLength || maxLength == 0 ) ? maxLength : Infinity;
		if (targetId && (boxes[GridId.GridSelect].length + 1 <= max || GridId.GridList == targetId)) {
			const result = move(boxes[sourceId], boxes[targetId], sourceIndex, targetIndex);
			setBoxes((prevBoxes) => ({
				...prevBoxes,
				[sourceId]: result[0],
				[targetId]: result[1],
			}));
		} else {
			const result = swap(boxes[sourceId], sourceIndex, targetIndex);
			setBoxes((prevBoxes) => ({
				...prevBoxes,
				[sourceId]: result,
			}));
		}
	};

	return { onChange };
};
