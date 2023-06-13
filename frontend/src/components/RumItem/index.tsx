import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { mutations } from "../../api/mutations";
import { UPDATE_RUM_REQUIRE } from "../../apollo-client/mutation";
import { usePopup } from "../../hooks/usePopup";
import { Requirement, Rum } from "../../types";
import { Avatar } from "../Avatar";
import { Arrow } from "../Icon";
import { Popup } from "../Popup";
import { RequireForm } from "../RequireForm";
import "./RumItem.scss";
import { useRequireData } from "./hooks/useRequireData";

type Props = HTMLAttributes<HTMLDivElement> & {
	data: Rum;
	size?: "medium" | "large";
};

export const RumItem = ({ data, size = "medium", className = "" }: Props) => {
	const { id, name, users, createdAt, require } = data;
	const [updateRumRequire, { loading, error }] = useMutation(UPDATE_RUM_REQUIRE);
	const [newRequire, setRequire] = useState<Requirement[]>(require.map(({ __typename, ...rest }) => rest));

	const { isOpen, onClose, onOpen } = usePopup();
	const { avatarTitle, avatarColor, avatarMust, lastItemLabel, mustExist } = useRequireData(newRequire);

	const time = dayjs(createdAt, "HH:mm:ss").format("HH:mm");
	const classNameRum = useMemo(
		() => `rum ${size} ${className} ${isOpen ? "shadow" : ""} ${mustExist ? "must" : ""}`,
		[size, className, isOpen, newRequire, mustExist],
	);

	const onRequirement = (arr: Requirement[]) => setRequire(arr);

	useEffect(() => {
		mutations(updateRumRequire, {
			rumId: id,
			require: newRequire,
		});
	}, [newRequire]);

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
						{lastItemLabel || avatarTitle} {<Arrow className="icon" color="#202B5D" />}
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
