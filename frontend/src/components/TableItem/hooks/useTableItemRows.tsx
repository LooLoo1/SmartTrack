import { useMemo } from "react";
import { UserWithData, TRow } from "../../../types";
import { Pen, Stuff, Trash } from "../../Icon";


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
			case "doctor":
				return [
					{ label: "Name", value: name, className: "name" },
					...(userRole !== "assistant" ? [{ label: "Phone", value: phone }] : []),
					{ label: "Email", value: email },
					{ label: "Rooms", value: rumsNames },

					...(userRole === "admin"
						? [
								{
									label: `Controls`,
									value: (
										<div className="controls">
											<button onClick={() => editUser({ id, name, phone, email })}>
												<Pen className="icon" color="#6AC7BE" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="#6AC7BE" />
											</button>
										</div>
									),
								},
						]
						: []),

					...(userRole === "assistant"
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
												<Stuff className="icon" color="#6AC7BE" />
											</button>
											<button onClick={() => editUser({ id, name, phone, email })}>
												<Pen className="icon" color="#6AC7BE" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="#6AC7BE" />
											</button>
										</div>
									),
								},
						]
						: []),
				];
			case "receptionist":
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
												<Pen className="icon" color="#6AC7BE" />
											</button>
											<button>
												<Trash onClick={() => deleteUser({ id, role })} className="icon" color="#6AC7BE" />
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
