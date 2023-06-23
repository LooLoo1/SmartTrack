import { CSSProperties, HTMLAttributes } from "react";
import "./Avatar.scss";

type Props = HTMLAttributes<HTMLDivElement> & {
	size?: "small" | "medium" | "large";
	title?: string | number;
	must?: boolean;
	maxLength?: number;
};

export const Avatar = ({ size = "medium", title = "", color = "0,0,0", must = false, maxLength = 1 }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	const classNameAvatar = `avatar ${size} ${must ? "must" : ""}`;
	if (title === "Empty") title = "";
	if (title.length > maxLength) title = title.substring(0, maxLength);

	return (
		<div className={classNameAvatar} style={styles}>
			{title}
		</div>
	);
};
