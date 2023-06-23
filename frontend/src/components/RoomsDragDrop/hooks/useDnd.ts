import { move, swap } from "react-grid-dnd";
import { SortedDnd } from "../types";

type ChangeDnd = (sourceId: string, sourceIndex: number, targetIndex: number, targetId?: string) => void;

export const useDnd = (boxes: SortedDnd, setBoxes: React.Dispatch<React.SetStateAction<SortedDnd>>) => {
    const onChange: ChangeDnd = (sourceId, sourceIndex, targetIndex, targetId) => {
      if (targetId) {
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
  }
