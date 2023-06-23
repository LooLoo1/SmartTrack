
export * from "./serverTypes"

export enum Role {
	Admin = "admin",
	Assistant = "assistant",
	Receptionist = "receptionist",
	Doctor = "doctor",
}

export type RoleType = (typeof Role)[keyof typeof Role]; // "admin" | "assistant" | "receptionist" | "doctor"
export type UsersRole = Role.Doctor | Role.Assistant | Role.Receptionist; //  "assistant" | "receptionist" | "doctor"
export const { Admin, Assistant, Receptionist, Doctor } = Role;

export type WithTypename<T extends string> = {
	__typename: T;
  };

