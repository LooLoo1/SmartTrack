import { useEffect, useState } from "react";
import { RumWithData } from "../../../types";
import { GridId, SortedDnd } from "../types";

type ColumnWidths = Record<string, number>;

export const useResize = (
	containerRef: React.RefObject<HTMLDivElement>,
	boxes: SortedDnd,
	rums: RumWithData[],
	ItemsGap: number,
) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [itemWidth, setItemWidth] = useState(screenWidth >= 768 ? 140 : 100);

	const initialColumnWidths = {
		[GridId.GridSelect]: itemWidth,
		[GridId.GridList]: itemWidth,
	};

	const [rowCount, setRowCount] = useState(0);
	const [columnWidths, setColumnWidths] = useState<ColumnWidths>(initialColumnWidths);
	const [containersHeight, setContainersHeight] = useState<Record<string, { height: string }>>({
		[GridId.GridSelect]: { height: `${initialColumnWidths[GridId.GridSelect]}px` },
		[GridId.GridList]: { height: `${initialColumnWidths[GridId.GridList]}px` },
	});

	const handleResize = () => {
		if (containerRef.current) {
			const divWidth = containerRef.current.offsetWidth - 35;
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
		const cWidth = screenWidth >= 768 ? 140 : 100
		setItemWidth(cWidth);

		setColumnWidths({
			[GridId.GridSelect]: cWidth,
			[GridId.GridList]: cWidth,
		})
	}, [screenWidth]);

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [rums, boxes, columnWidths, ItemsGap, containerRef, setContainersHeight, setRowCount, itemWidth]);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		handleResize,
		rowCount,
		setRowCount,
		columnWidths,
		setColumnWidths,
		containersHeight,
		setContainersHeight,
		itemWidth,
	};
};
