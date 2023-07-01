import { useMutation } from "@apollo/client";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { mutations } from "../../api/mutations";
import { UPDATE_RUM_REQUIRE } from "../../apollo-client/mutation";
import { usePopup } from "../../hooks/usePopup";
import { Requirement, Rum } from "../../types";
import { Avatar } from "../Avatar";
import { Arrow, Pen } from "../Icon";
import { Popup } from "../Popup";
import { RequireForm } from "../RequireForm";
import "./RumItem.scss";
import { useRequireData } from "./hooks/useRequireData";

type Props = HTMLAttributes<HTMLDivElement> & {
	data: Partial<Rum>;
	size?: "small" | "medium" | "large";

	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
};

export const RumItem = ({ data, size = "medium", className = "", onDelete, onEdit }: Props) => {
	const { id = "", name, users = [""], createdAt = 0, require = [] } = data;
	const [updateRumRequire, { error }] = useMutation(UPDATE_RUM_REQUIRE);
	const [newRequire, setRequire] = useState<Requirement[]>(require.map(({ __typename, ...rest }) => rest));

	const { isOpen, onClose, onOpen } = usePopup();
	const { avatarTitle, avatarColor, avatarMust, lastItemLabel, mustExist } = useRequireData(newRequire);

	const dataTime = new Date(Number(createdAt));
	const time = `${dataTime.getHours().toString().padStart(2, '0')}:${dataTime.getMinutes().toString().padStart(2, '0')}`

	const classNameRum = useMemo(
		() => `rum ${size} ${className} ${isOpen ? "shadow" : ""} ${mustExist ? "must" : ""}`,
		[size, className, isOpen, mustExist],
	);

	const onRequirement = (arr: Requirement[]) => setRequire(arr);

	useEffect(() => {
		if (size !== "small") {
			mutations(updateRumRequire, {
				rumId: id,
				require: newRequire,
			});
		}
	}, [newRequire, id, size, updateRumRequire]);

	if (size === "small" && onDelete && onEdit) {
		return (
			<div className={classNameRum}>
				<div className="head">
					<div
						className="exit"
						onClick={() => {
							onDelete(String(id));
						}}
					/>
					<Pen
						className="edit"
						color="--accent-color"
						onClick={() => {
							onEdit(String(id));
						}}
					/>
				</div>

				<div className="body">
					<Avatar size={size} title={name} color={"var(--accent-color)"} must={avatarMust} maxLength={5} className="body-avatar" />
					{users[0] && <p className="body-label">{users[0]}</p>}
				</div>
			</div>
		);
	}

	return (
		<>
			<button type="button" className={classNameRum} onClick={onOpen}>
				<div className="head">
					<span className="name">{name}</span>
					<span className="time">{time}</span>
				</div>

				<div className="body">
					<Avatar size={size} title={avatarTitle} color={avatarColor} must={avatarMust} />
					<p className="body-label">
						{lastItemLabel || avatarTitle} {<Arrow className="icon" color="--header-color" />}
					</p>
					{error && <p className="error">{String(error)}</p>}
				</div>
			</button>
			<Popup isOpen={isOpen} onClose={onClose} shadow={false}>
				<RequireForm newRequire={newRequire} setRequire={onRequirement} />
			</Popup>
		</>
	);
};
