import { IconsList, Props } from ".";

type IProps = {
	name: keyof typeof IconsList;
} & Props;

export const Icons = ({ name, ...props }: IProps) => {
	const IconComponent = IconsList[name];

	if (IconComponent) {
		return <IconComponent {...props} />;
	}

	return null;
};
