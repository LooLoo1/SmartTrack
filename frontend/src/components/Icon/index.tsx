import { CSSProperties, ReactElement } from "react";
import useCSSVariable from "../../hooks/useCSSVariable";

export type Props = {
	color?: string;
} & React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>;

export const Allerts = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const Dashboard = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M21.5625 5.75H1.43751C0.644966 5.75 7.62939e-06 5.10504 7.62939e-06 4.3125V1.4375C7.62939e-06 0.644958 0.644966 0 1.43751 0H21.5625C22.355 0 23 0.644958 23 1.4375V4.3125C23 5.10504 22.355 5.75 21.5625 5.75ZM1.43751 0.958333C1.17301 0.958333 0.958341 1.173 0.958341 1.4375V4.3125C0.958341 4.577 1.17301 4.79167 1.43751 4.79167H21.5625C21.827 4.79167 22.0417 4.577 22.0417 4.3125V1.4375C22.0417 1.173 21.827 0.958333 21.5625 0.958333H1.43751Z"
				fill={color}
			/>
			<path
				d="M9.10417 22.9999H1.4375C0.644958 22.9999 0 22.355 0 21.5624V9.1041C0 8.31156 0.644958 7.6666 1.4375 7.6666H9.10417C9.89671 7.6666 10.5417 8.31156 10.5417 9.1041V21.5624C10.5417 22.355 9.89671 22.9999 9.10417 22.9999ZM1.4375 8.62494C1.173 8.62494 0.958333 8.8396 0.958333 9.1041V21.5624C0.958333 21.8269 1.173 22.0416 1.4375 22.0416H9.10417C9.36867 22.0416 9.58333 21.8269 9.58333 21.5624V9.1041C9.58333 8.8396 9.36867 8.62494 9.10417 8.62494H1.4375Z"
				fill={color}
			/>
			<path
				d="M21.5626 14.3749H13.8959C13.1034 14.3749 12.4584 13.73 12.4584 12.9374V9.1041C12.4584 8.31156 13.1034 7.6666 13.8959 7.6666H21.5626C22.3551 7.6666 23.0001 8.31156 23.0001 9.1041V12.9374C23.0001 13.73 22.3551 14.3749 21.5626 14.3749ZM13.8959 8.62494C13.6314 8.62494 13.4167 8.8396 13.4167 9.1041V12.9374C13.4167 13.2019 13.6314 13.4166 13.8959 13.4166H21.5626C21.8271 13.4166 22.0417 13.2019 22.0417 12.9374V9.1041C22.0417 8.8396 21.8271 8.62494 21.5626 8.62494H13.8959Z"
				fill={color}
			/>
			<path
				d="M21.5626 22.9999H13.8959C13.1034 22.9999 12.4584 22.355 12.4584 21.5624V17.7291C12.4584 16.9366 13.1034 16.2916 13.8959 16.2916H21.5626C22.3551 16.2916 23.0001 16.9366 23.0001 17.7291V21.5624C23.0001 22.355 22.3551 22.9999 21.5626 22.9999ZM13.8959 17.2499C13.6314 17.2499 13.4167 17.4646 13.4167 17.7291V21.5624C13.4167 21.8269 13.6314 22.0416 13.8959 22.0416H21.5626C21.8271 22.0416 22.0417 21.8269 22.0417 21.5624V17.7291C22.0417 17.4646 21.8271 17.2499 21.5626 17.2499H13.8959Z"
				fill={color}
			/>
		</svg>
	);
};

export const Sequence = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1 0C0.447715 0 0 0.447715 0 1V5C0 5.55228 0.447715 6 1 6H5C5.55228 6 6 5.55228 6 5V1C6 0.447715 5.55228 0 5 0H1ZM5 1H1L1 5H5V1Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 7C14.4477 7 14 7.44772 14 8V12C14 12.5523 14.4477 13 15 13H19C19.5523 13 20 12.5523 20 12V8C20 7.44772 19.5523 7 19 7H15ZM19 8H15V12H19V8Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 8C0 7.44772 0.447715 7 1 7H5C5.55228 7 6 7.44772 6 8V12C6 12.5523 5.55228 13 5 13H1C0.447715 13 0 12.5523 0 12V8ZM1 8H5V12H1L1 8Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 0C7.44772 0 7 0.447715 7 1V5C7 5.55228 7.44772 6 8 6H12C12.5523 6 13 5.55228 13 5V1C13 0.447715 12.5523 0 12 0H8ZM12 1H8V5H12V1Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14 1C14 0.447715 14.4477 0 15 0H19C19.5523 0 20 0.447715 20 1V5C20 5.55228 19.5523 6 19 6H15C14.4477 6 14 5.55228 14 5V1ZM15 1H19V5H15V1Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22 0C21.4477 0 21 0.447715 21 1V5C21 5.55228 21.4477 6 22 6H26C26.5523 6 27 5.55228 27 5V1C27 0.447715 26.5523 0 26 0H22ZM26 1H22V5H26V1Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 15C0 14.4477 0.447715 14 1 14H5C5.55228 14 6 14.4477 6 15V19C6 19.5523 5.55228 20 5 20H1C0.447715 20 0 19.5523 0 19V15ZM1 15H5V19H1L1 15Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 14C7.44772 14 7 14.4477 7 15V19C7 19.5523 7.44772 20 8 20H12C12.5523 20 13 19.5523 13 19V15C13 14.4477 12.5523 14 12 14H8ZM12 15H8V19H12V15Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7 22C7 21.4477 7.44772 21 8 21H12C12.5523 21 13 21.4477 13 22V26C13 26.5523 12.5523 27 12 27H8C7.44772 27 7 26.5523 7 26V22ZM8 22H12V26H8V22Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 14C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14H15ZM19 15H15V19H19V15Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21 15C21 14.4477 21.4477 14 22 14H26C26.5523 14 27 14.4477 27 15V19C27 19.5523 26.5523 20 26 20H22C21.4477 20 21 19.5523 21 19V15ZM22 15H26V19H22V15Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 21C14.4477 21 14 21.4477 14 22V26C14 26.5523 14.4477 27 15 27H19C19.5523 27 20 26.5523 20 26V22C20 21.4477 19.5523 21 19 21H15ZM19 22H15V26H19V22Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21 8C21 7.44772 21.4477 7 22 7H26C26.5523 7 27 7.44772 27 8V12C27 12.5523 26.5523 13 26 13H22C21.4477 13 21 12.5523 21 12V8ZM22 8H26V12H22V8Z"
				fill={color}
			/>
		</svg>
	);
};

export const Stuff = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M22.4092 2.05997C21.8524 1.32179 21.0028 0.898458 20.0781 0.898458H19.6867V0.673855C19.6867 0.301732 19.385 4.49207e-05 19.0129 4.49207e-05C18.6408 4.49207e-05 18.3391 0.301732 18.3391 0.673855V2.47068C18.3391 2.8428 18.6408 3.14449 19.0129 3.14449C19.385 3.14449 19.6867 2.8428 19.6867 2.47068V2.24608H20.0781C20.576 2.24608 21.0335 2.47405 21.3333 2.87151C21.6331 3.26897 21.7266 3.77149 21.5898 4.25021L19.8015 10.5095C19.3024 12.2563 17.6851 13.4762 15.8684 13.4762C14.0518 13.4762 12.4345 12.2562 11.9354 10.5095L10.1471 4.25017C10.0103 3.77145 10.1038 3.26892 10.4036 2.87146C10.7034 2.47396 11.1609 2.24603 11.6588 2.24603H12.0502V2.47064C12.0502 2.84276 12.3519 3.14445 12.724 3.14445C13.0961 3.14445 13.3978 2.84276 13.3978 2.47064V0.67381C13.3978 0.301687 13.0961 0 12.724 0C12.3519 0 12.0502 0.301687 12.0502 0.67381V0.898413H11.6588C10.7342 0.898413 9.88452 1.32179 9.32773 2.05993C8.77089 2.79811 8.59727 3.73133 8.8513 4.62036L10.6397 10.8797C10.967 12.0252 11.6427 13.0098 12.5937 13.7272C12.7976 13.881 13.0102 14.0182 13.2295 14.1405L15.1947 18.7789V19.2652C15.1947 20.5812 14.1241 21.6518 12.8081 21.6518C11.4922 21.6518 10.4216 20.5812 10.4216 19.2652V14.6441C10.4216 12.514 8.68855 10.781 6.55841 10.781C4.42828 10.781 2.69524 12.514 2.69524 14.6441V16.2392C1.15931 16.5522 0 17.9135 0 19.5405C0 21.3982 1.51135 22.9095 3.36905 22.9095C5.22674 22.9095 6.7381 21.3982 6.7381 19.5405C6.7381 17.9135 5.57878 16.5523 4.04286 16.2392V14.6441C4.04286 13.2571 5.17135 12.1286 6.55841 12.1286C7.94547 12.1286 9.07397 13.2571 9.07397 14.6441V19.2652C9.07397 21.3242 10.7491 22.9994 12.8081 22.9994C14.8672 22.9994 16.5423 21.3242 16.5423 19.2652V18.7789L18.5075 14.1405C18.7268 14.0182 18.9394 13.881 19.1432 13.7272C20.0943 13.0098 20.77 12.0252 21.0973 10.8797L22.8857 4.62036C23.1397 3.73138 22.966 2.79811 22.4092 2.05997ZM5.39048 19.5405C5.39048 20.6551 4.48366 21.5619 3.36905 21.5619C2.25443 21.5619 1.34762 20.6551 1.34762 19.5405C1.34762 18.4259 2.25443 17.5191 3.36905 17.5191C4.48366 17.5191 5.39048 18.4259 5.39048 19.5405ZM15.8685 16.9148L14.9498 14.7464C15.2506 14.7974 15.5575 14.8238 15.8685 14.8238C16.1796 14.8238 16.4864 14.7974 16.7872 14.7464L15.8685 16.9148Z"
				fill={color}
			/>
			<path
				d="M3.36914 20.2136C3.74128 20.2136 4.04297 19.9119 4.04297 19.5398C4.04297 19.1676 3.74128 18.866 3.36914 18.866C2.99699 18.866 2.69531 19.1676 2.69531 19.5398C2.69531 19.9119 2.99699 20.2136 3.36914 20.2136Z"
				fill={color}
			/>
		</svg>
	);
};

export const Trash = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path d="M2.5 5H4.16667H17.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="M6.66699 5.0013V3.33464C6.66699 2.89261 6.84259 2.46868 7.15515 2.15612C7.46771 1.84356 7.89163 1.66797 8.33366 1.66797H11.667C12.109 1.66797 12.5329 1.84356 12.8455 2.15612C13.1581 2.46868 13.3337 2.89261 13.3337 3.33464V5.0013M15.8337 5.0013V16.668C15.8337 17.11 15.6581 17.5339 15.3455 17.8465C15.0329 18.159 14.609 18.3346 14.167 18.3346H5.83366C5.39163 18.3346 4.96771 18.159 4.65515 17.8465C4.34259 17.5339 4.16699 17.11 4.16699 16.668V5.0013H15.8337Z"
				stroke={color}
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8.33301 9.16797V14.168"
				stroke={color}
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M11.667 9.16797V14.168" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const Pen = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M12.75 2.25023C12.947 2.05324 13.1808 1.89699 13.4382 1.79038C13.6956 1.68378 13.9714 1.62891 14.25 1.62891C14.5286 1.62891 14.8044 1.68378 15.0618 1.79038C15.3192 1.89699 15.553 2.05324 15.75 2.25023C15.947 2.44721 16.1032 2.68106 16.2098 2.93843C16.3164 3.1958 16.3713 3.47165 16.3713 3.75023C16.3713 4.0288 16.3164 4.30465 16.2098 4.56202C16.1032 4.81939 15.947 5.05324 15.75 5.25023L5.625 15.3752L1.5 16.5002L2.625 12.3752L12.75 2.25023Z"
				stroke={color}
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const LogOut = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");

	return (
		<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18.667 19.8346L24.5003 14.0013L18.667 8.16797"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M24.5 14H10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export const Arrow = ({ color = "white", ...props }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	color = useCSSVariable(color, "white");
	return (
		<svg viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} style={styles}>
			<path
				d="M5.82415 6.38027C6.20651 6.73088 6.79349 6.73088 7.17585 6.38027L11.9669 1.98704C12.639 1.37072 12.203 0.25 11.291 0.25H1.70896C0.797032 0.25 0.360986 1.37072 1.03312 1.98704L5.82415 6.38027Z"
				fill={color}
			/>
		</svg>
	);
};

type TIconComponent = ({ color, ...props }: Props) => ReactElement;

export const IconsList: Record<string, TIconComponent> = {
	Allerts,
	Dashboard,
	Sequence,
	Stuff,
	Doctors: Stuff,
	Trash,
	Pen,
	LogOut,
	Arrow,
};
