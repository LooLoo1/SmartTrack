import type { Meta, StoryObj } from "@storybook/react";
import "../../index.scss";
import { Button } from "../Button";
import "./Button.scss";

const meta: Meta<typeof Button> = {
	title: "Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "text", "out", "table", "plus"],
			description: "Type of button",
		},
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
		},
		color: {
			control: { type: "select" },
			options: ["green", "orange", "purple"],
			description: "Button color",

		},
		leftChild: {
			control: { type: null },
			description: "Icons or string",
		},
		rightChild: {
			control: { type: null },
			description: "Icons or string",
		},
		children:{
			description: "Label of text",
		}
	},
	args: {
		color: "green",
		children: "Click me :3",
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Click me :3",
	},
};

export const Text: Story = {
	args: {
		variant: "text",
		children: "Click me :3",
	},
};

export const Outline: Story = {
	args: {
		variant: "out",
		children: "Click me :3",
	},
};

export const Table: Story = {
	args: {
		variant: "table",
		children: "Click me :3",
	},
};

export const Plus: Story = {
	args: {
		variant: "plus",
		children: "Click me :3",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		children: "Click me :3",
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
		children: "Click me :3",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		children: "Click me :3",
	},
};

export const Green: Story = {
	args: {
		color: "green",
		children: "Click me :3",
	},
};

export const Orange: Story = {
	args: {
		color: "orange",
		children: "Click me :3",
	},
};

export const Purple: Story = {
	args: {
		color: "purple",
		children: "Click me :3",
	},
};
