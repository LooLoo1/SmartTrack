import { CSSProperties, HTMLAttributes } from "react";
import "./Avatar.scss";

type Props = HTMLAttributes<HTMLDivElement> & {
	size?: "small" | "medium" | "large";
	title?: string | number;
	must?: boolean;
};

export const Avatar = ({ size = "medium", title = "", color = "0,0,0", must = false }: Props) => {
	const styles = {
		"--color": color,
	} as CSSProperties;

	const classNameAvatar = `avatar ${size} ${must ? "must" : ""}`;
	if (title === "Empty") title = "";
	if (typeof title === "string" && title.length > 1) title = title[0];

	return (
		<div className={classNameAvatar} style={styles}>
			{title}
		</div>
	);
};

