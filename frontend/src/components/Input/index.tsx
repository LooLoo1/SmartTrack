import { InputHTMLAttributes, forwardRef } from "react";
import "./Input.scss";

type CustomInputProps = {
	name: string;
	label: string;
	placeholder: string;
	ref: any;
	error?: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> &
	CustomInputProps & {
		variant?: "default" | "primary" | "secondary";
	};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, label, placeholder, error, variant = "default", className = "", ...props }, ref) => {
		const classNamesLabel = `input ${className} ${error ? "error" : ""}`;
		const classNameInput = `control ${className} ${variant} ${error ? "error" : ""}`;

		return (
			<label htmlFor={name} className={classNamesLabel}>
				<p className="label">{label}</p>
				<input
					type="text"
					id={name}
					name={name}
					placeholder={placeholder}
					className={classNameInput}
					{...props}
					ref={ref}
				/>
				{error && <p className="message">{error}</p>}
			</label>
		);
	},
);
