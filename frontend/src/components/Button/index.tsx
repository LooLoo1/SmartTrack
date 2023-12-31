import { ButtonHTMLAttributes, ReactElement } from "react";
import "./Button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	leftChild?: ReactElement;
	rightChild?: ReactElement;
	variant?: "default" | "text" | "out" | "table" | "plus";
	size?: "small" | "medium" | "large";
	color?: "green" | "orange" | "purple";
};

export const Button = ({
	variant = "default",
	size = "medium",
	color = "green",
	className,
	children,
	leftChild,
	rightChild,
	...props
}: ButtonProps) => {
	const classNames = `button ${variant} ${size} ${color} ${className}`;

	if (variant === "plus") leftChild = <div className="plus-icon"></div>

	const left = leftChild ? <span className="children">{leftChild}</span> : null;
	const right = rightChild ? <span className="children">{rightChild}</span> : null;

	return (
		<button type="button" className={classNames} {...props}>
			{left}
			{children}
			{right}
		</button>
	);
};
