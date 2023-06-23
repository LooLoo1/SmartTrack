import { RoleType, WithTypename } from ".";

export type Requirement = {
	label: string;
	must: boolean;
	color?: string;
} & Partial<WithTypename<"Requirement">>;

export type Rum = {
	id: number | string;
	name: string;
	users: number[] | string[];
	createdAt: number;
	require: Requirement[];
};

export type TDoctor = {
	id: number;
	name: string;
	specialty: string;
	maxLength: number;
	rums: number[];
};

export type UserWithData = {
	id: number | string;
	name: string;
	phone: string;
	email: string;
	role: RoleType | string;
	maxLength: number | null;

	doctors: [UserWithData] | [];
	rums: [Rum] | [];
};

export type User = {
	id: string;
	name: string;
	phone: string;
	email: string;
	role: RoleType;
	maxLength: number | null;

	doctors: number[] | null;
	rums: number[] | null;
};

export type RumWithData = {
	id: string;
	name: string;
	users: User[];
	createdAt: number;
	require: Requirement[];
};
