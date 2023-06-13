import { ReactNode } from "react";

export type Requirement = {
	label: string;
	must: boolean;
	color?: string;
	__typename?: string;
};

export type Rum = {
	id: number;
	name: string;
	users: number[];
	createdAt: number;
	require: Requirement[];
};

export type Doctor = {
	id: number;
	name: string;
	specialty: string;
	maxLength: number;
	rums: number[];
};

export interface UserWithData {
	id: number;
	name: string;
	phone: string;
	email: string;
	role: "admin" | "assistant" | "receptionist" | "doctor";
	maxLength: number | null;

	doctors: [UserWithData] | [];
	rums: [Rum] | [];
}

export interface TRow {
	label: string;
	value: string | ReactNode;
	className?: string;
}
