import { RoleType } from "../../../types";

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
}

export interface User {
	id: number;
	name: string;
	phone: string;
	email: string;
	role: RoleType;

	doctors: [number] | null;
	maxLength: number | null
    rums: [number] | null
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface ErrorResponse {
	message: string;
}
