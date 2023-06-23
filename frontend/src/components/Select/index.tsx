import { ChangeEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Arrow } from "../Icon";
import "./Select.scss";

type Option = {
	value: string;
	label: string;
};

type Props = {
	options: Option[];
	selectedValue: string;
	onChange: (value: string) => void;
	arrowIcon?: React.ReactNode;
	className?: string;
};

export const Select = ({
	options,
	selectedValue,
	onChange,
	arrowIcon = <Arrow color="--color-black" />,
	className = "",
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const handleSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		onChange(value);
		setIsOpen(false);
	};

	const handleToggle = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const handleOptionSelection = (value: string) => {
		onChange(value);
		selectRef.current?.focus();
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter") {
			setIsOpen((prevIsOpen) => !prevIsOpen);
		}
		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			const currentIndex = options.findIndex((option) => option.value === selectedValue);
			const offset = event.key === "ArrowUp" ? -1 : 1;
			const nextIndex = (currentIndex + offset + options.length) % options.length;
			handleOptionSelection(options[nextIndex].value);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div
			className={`selector-component ${isOpen ? "open" : ""} ${className}`}
			ref={selectRef}
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<div className="selected-value" onClick={handleToggle}>
				{selectedValue}
				{arrowIcon && <span className="selector-icon">{arrowIcon}</span>}
			</div>
			{isOpen && (
				<div className="options">
					{options.map((option) => (
						<Fragment key={option.value}>
							<input
								type="radio"
								id={option.value}
								name="select"
								value={option.value}
								checked={selectedValue === option.value}
								onChange={handleSelectionChange}
							/>
							<label htmlFor={option.value} className={`option ${selectedValue === option.value ? "selected" : ""}`}>
								{option.label}
							</label>
						</Fragment>
					))}
				</div>
			)}
		</div>
	);
};
