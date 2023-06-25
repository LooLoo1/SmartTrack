import type { Meta, StoryObj } from "@storybook/react";
import { IconsList } from ".";
import "../../index.scss";
import { Icons } from "./Icons";

const meta: Meta<typeof Icons> = {
	title: "Icons",
	component: Icons,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		name: {
			control: { type: "select" },
			options: Object.keys(IconsList),
		},
	},
	args: {
		name: Object.keys(IconsList)[0],
		className: "icon",
		color: "--accent-color"
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {};
