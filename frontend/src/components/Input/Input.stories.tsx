import type { Meta, StoryObj } from "@storybook/react";
import "../../index.scss";
import { Input } from "../Input";
import "./Input.scss";

const meta: Meta<typeof Input> = {
	title: "Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "primary", "secondary"],
			description: "Type of input",
		},
		error: {
			control: { type: "text" },
		},
		placeholder: {
			description: "Placeholder text",
			control: { type: "text" },
		},

	},
	args: {
		variant: "default",
		label: "Your name",
		placeholder: "Write please"
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
	},
};

export const Error: Story = {
	args: {
		label: "Email",
		error: "Error message...",
		defaultValue: "kyiv@..."
	},
};
