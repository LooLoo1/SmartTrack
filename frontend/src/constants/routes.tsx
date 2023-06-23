import { ReactNode } from "react";
import { Dashboard, DoctorWorkSpace, Sequence, Stuff } from "../pages";

export type TRoutes = {
	path: string;
	element: ReactNode;
}

const admin: TRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard />,
	},
	{
		path: "Stuff",
		element: <Stuff />,
	},
	{
		path: "Sequence",
		element: <Sequence />,
	},
];

const assistant: TRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard />,
	},
	{
		path: "Doctors",
		element: <Stuff type={"assistant"} />,
	},
];

const receptionist: TRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard />,
	},
	{
		path: "Stuff",
		element: <Stuff />,
	},
];

const doctor: TRoutes[] = [
	{
		path: ":id",
		element: <DoctorWorkSpace />,
	},
];

export const PROTECT_ROUTES: {
	[key: string]: TRoutes[];
} = {
	admin,
	assistant,
	receptionist,
	doctor,
};
