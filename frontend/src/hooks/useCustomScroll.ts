import { useEffect, useRef } from "react";

interface SwipeState {
	startX: number;
	startY: number;
	isSwiping: boolean;
}

export const useCustomScroll = <T extends HTMLElement>(direction: "horizontal" | "vertical"): React.RefObject<T> => {
	const elementRef = useRef<T>(null);
	const swipeState = useRef<SwipeState>({
		startX: 0,
		startY: 0,
		isSwiping: false,
	});

	useEffect(() => {
		const element = elementRef.current;

		if (element) {
			const handleWheel = (event: WheelEvent) => {
				if (direction === "horizontal") {
					element.scrollLeft += event.deltaY;
				} else if (direction === "vertical") {
					element.scrollTop += event.deltaY;
				}
				event.preventDefault();
			};

			const handleMouseDown = (event: MouseEvent) => {
				swipeState.current.startX = event.clientX;
				swipeState.current.startY = event.clientY;
				swipeState.current.isSwiping = true;
			};

			const handleMouseMove = (event: MouseEvent) => {
				if (swipeState.current.isSwiping) {
					const diffX = event.clientX - swipeState.current.startX;
					const diffY = event.clientY - swipeState.current.startY;
					if (direction === "horizontal") {
						element.scrollLeft -= diffX;
					} else if (direction === "vertical") {
						element.scrollTop -= diffY;
					}
					swipeState.current.startX = event.clientX;
					swipeState.current.startY = event.clientY;
				}
			};

			const handleMouseUp = () => {
				swipeState.current.isSwiping = false;
			};

			element.addEventListener("wheel", handleWheel);
			element.addEventListener("mousedown", handleMouseDown);
			element.addEventListener("mousemove", handleMouseMove);
			element.addEventListener("mouseup", handleMouseUp);
			element.addEventListener("mouseleave", handleMouseUp);

			return () => {
				element.removeEventListener("wheel", handleWheel);
				element.removeEventListener("mousedown", handleMouseDown);
				element.removeEventListener("mousemove", handleMouseMove);
				element.removeEventListener("mouseup", handleMouseUp);
				element.removeEventListener("mouseleave", handleMouseUp);
			};
		}
	}, [direction]);

	return elementRef;
};
