import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";
import "../../index.scss";
import "./Avatar.scss";

const meta: Meta<typeof Avatar> = {
	title: "Avatar",
	component: Avatar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: {
				type: "object",
				options: {
					color: {
						control: "color",
					},
				},
			},
			parseValue: (value: string) => {
				const [red, green, blue] = value.split(",").map(Number);
				return { red, green, blue };
			},
			formatValue: ({ red, green, blue }: { red: string; green: string; blue: string }) => `${red},${green},${blue}`,
		},
	},
	args: {
		size: "medium",
		title: "John Doe",
		color: "106, 199, 190",
		must: false,
		maxLength: 1,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

/** Small version of the component with solid padding */
export const Small: Story = {
	args: {
		size: "small",
	},
};

/** Medium version of the component */
export const Medium: Story = {
	args: {
		size: "medium",
	},
};

/** Large version of the component */
export const Large: Story = {
	args: {
		size: "large",
	},
};

/** A property that indicates the activity of the component */
export const Must: Story = {
	args: {
		size: "medium",
		must: true,
	},
};
