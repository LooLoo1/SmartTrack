import { useEffect, useState } from "react";
import { RumWithData } from "../../../types";
import { GridId, SortedDnd } from "../types";

type ColumnWidths = Record<string, number>;

export const useResize = (
	containerRef: React.RefObject<HTMLDivElement>,
	boxes: SortedDnd,
	rums: RumWithData[],
	initialColumnWidths: ColumnWidths,
	ItemsGap: number,
) => {
	const [rowCount, setRowCount] = useState(0);
	const [columnWidths, setColumnWidths] = useState<ColumnWidths>(initialColumnWidths);
	const [containersHeight, setContainersHeight] = useState<Record<string, { height: string }>>({
		[GridId.GridSelect]: { height: `${initialColumnWidths[GridId.GridSelect]}px` },
		[GridId.GridList]: { height: `${initialColumnWidths[GridId.GridList]}px` },
	});

	const handleResize = () => {
		if (containerRef.current) {
			const divWidth = containerRef.current.offsetWidth;
			const rowSize = Math.floor(divWidth / (columnWidths[GridId.GridSelect] + ItemsGap));
			setRowCount(rowSize);

			const GridSelectHeight = Math.max(
				Math.ceil(boxes[GridId.GridSelect].length / rowSize) * (columnWidths[GridId.GridSelect] + ItemsGap),
				50,
			);
			const GridListHeight = Math.max(
				Math.ceil(boxes[GridId.GridList].length / rowSize) * (columnWidths[GridId.GridList] + ItemsGap),
				columnWidths[GridId.GridList],
			);

			const GridSelectStyle = { height: `${GridSelectHeight}px` };
			const GridListStyle = { height: `${GridListHeight}px` };

			setContainersHeight({
				[GridId.GridSelect]: GridSelectStyle,
				[GridId.GridList]: GridListStyle,
			});
		}
	};

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [rums, boxes, columnWidths, ItemsGap, containerRef, setContainersHeight, setRowCount]);

	return {
		handleResize,
		rowCount,
		setRowCount,
		columnWidths,
		setColumnWidths,
		containersHeight,
		setContainersHeight,
	};
};
