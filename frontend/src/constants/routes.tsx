import { ReactNode } from "react";
import { Dashboard, DoctorWorkSpace, Doctors, Sequence, Stuff } from "../pages";

export interface IRoutes {
	path: string;
	element: ReactNode;
}

const admin: IRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard/>,
	},
	{
		path: "Stuff",
		element: <Stuff/>,
	},
	{
		path: "Sequence",
		element: <Sequence/>,
	},
];

const assistant: IRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard/>,
	},
	{
		path: "Doctors",
		element: <Doctors/>,
	},
];

const receptionist: IRoutes[] = [
	{
		path: "Dashboard",
		element: <Dashboard/>,
	},
	{
		path: "Stuff",
		element: <Stuff/>,
	},
];

const doctor: IRoutes[] = [
	{
		path: ":id",
		element: <DoctorWorkSpace/>,
	},
];


export const PROTECT_ROUTES:{
	[key: string]: IRoutes[];
	// admin: IRoutes[];
	// assistant: IRoutes[];
	// receptionist: IRoutes[];
	// doctor: IRoutes[];
  } = {
	admin,
	assistant,
	receptionist,
	doctor,
};
