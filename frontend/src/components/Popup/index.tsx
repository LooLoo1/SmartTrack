import { HTMLAttributes, useEffect, useRef } from "react";
import "./Popup.scss";

type PopupProps = HTMLAttributes<HTMLDivElement> & {
	isOpen: boolean;
	onClose: () => void;
	shadow?: boolean;
	title?: string;
};

export const Popup = ({ isOpen, onClose, children, shadow = true, title }: PopupProps) => {
	const popupRef = useRef<HTMLDivElement>(null);
	const classNamePopup = `popup ${shadow ? "bg" : ""}`;

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={classNamePopup}>
			<div className="popup-content" ref={popupRef}>
				{title && <h2 className="title center">{title}</h2>}
				{children}
				<button type="button" className="close-button" onClick={onClose} />
			</div>
		</div>
	);
};
