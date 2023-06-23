import { ReactNode, useMemo } from "react";
import { Assistant, Doctor, Receptionist, UserWithData } from "../../../types";
import { Pen, Stuff, Trash } from "../../Icon";

export type TRow = {
	label: string;
	value: ReactNode;
	className?: string;
}


type UseTableItemRowsProps = {
	data: UserWithData;
	role: string;
	userRole: string;
	editUser: (userData: Partial<UserWithData>) => void;
	deleteUser: (userData: Partial<UserWithData>) => void;
	assistantButton: JSX.Element;
};

export const useTableItemRows = ({
	data,
	role,
	userRole,
	editUser,
	deleteUser,
	assistantButton,
}: UseTableItemRowsProps): TRow[] => {
	const rows = useMemo(() => {
		const template: TRow[] = [{ label: "string", value: "" }];
		const { id, name, phone, email, rums } = data;
		const rumsNames = rums.length > 0 ? rums.map(({ name }) => name).join(", ") : "none";

		switch (role) {
			case Doctor:
				return [
					{ label: "Name", value: name, className: "name" },
					...(userRole !== Assistant ? [{ label: "Phone", value: phone }] : []),
					{ label: "Email", value: email },
					{ label: "Rooms", value: rumsNames },

					...(userRole === "admin"
						? [
								{
									label: `Controls`,
									value: (
										<div className="controls">
											<button onClick={() => editUser({ id, name, phone, email })}>
												<Pen className="icon" color="--accent-color" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="--accent-color" />
											</button>
										</div>
									),
								},
						]
						: []),

					...(userRole === Assistant
						? [
								{
									label: "Select Doctor",
									value: assistantButton,
								},
						]
						: []),
				];

			case "assistant":
				return [
					{ label: "Name", value: name, className: "name" },
					{ label: "Phone", value: phone },
					{ label: "Email", value: email },
					...(userRole !== "admin" ? [{ label: "Rooms", value: rumsNames }] : []),

					...(userRole === "admin"
						? [
								{
									label: `Controls`,
									value: (
										<div className="controls">
											<button>
												<Stuff className="icon" color="--accent-color" />
											</button>
											<button onClick={() => editUser({ id, name, phone, email })}>
												<Pen className="icon" color="--accent-color" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="--accent-color" />
											</button>
										</div>
									),
								},
						]
						: []),
				];
			case Receptionist:
				return [
					{ label: "Name", value: name, className: "name" },
					{ label: "Email", value: email },
					{ label: "Phone", value: phone },

					...(userRole === "admin"
						? [
								{
									label: `Controls`,
									value: (
										<div className="controls">
											<button onClick={() => editUser({ id, name, phone, email })}>
												<Pen className="icon" color="--accent-color" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="--accent-color" />
											</button>
										</div>
									),
								},
						]
						: []),
				];

			default:
				break;
		}

		return template;
	}, [data, editUser, role, userRole, assistantButton, deleteUser]);

	return rows;
};
