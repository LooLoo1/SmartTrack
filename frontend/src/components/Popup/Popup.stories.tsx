import type { Meta, StoryObj } from "@storybook/react";
import { usePopup } from "../../hooks";
import "../../index.scss";
import { Button } from "../Button";
import { Popup } from "../Popup";
import "./Popup.scss";

const meta: Meta<typeof Popup> = {
	title: "Popup",
	component: Popup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: { type: null },
		},
	},
	args: {
		isOpen: true,
		title: "Popup Title",
		children: <div>Popup Content and some data...</div>,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = (args: Story) => {
	const { isOpen, onClose, onOpen } = usePopup();

	return (
		<>
			<Button onClick={onOpen}>{isOpen ? "Close" : "Open"}</Button>
			<Popup {...args} isOpen={isOpen} onClose={onClose}></Popup>
		</>
	);
};
