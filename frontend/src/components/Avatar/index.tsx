import { CSSProperties, HTMLAttributes } from "react";
import "./Avatar.scss";

type Props = HTMLAttributes<HTMLDivElement> & {
	/** Size of the avatar (small, medium, large) */
	size?: "small" | "medium" | "large";
	/** Title or label for the avatar */
	title?: string | number;
	/** Flag indicating if the avatar is a "must" avatar */
	must?: boolean;
	/** Maximum length of the title */
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
