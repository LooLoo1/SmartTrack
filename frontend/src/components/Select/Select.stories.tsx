import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import "../../index.scss";
import { Select, Option } from "../Select";
import "./Select.scss";

const options: Option[] = [
	{ value: "option1", label: "Option 1" },
	{ value: "option2", label: "Option 2" },
	{ value: "option3", label: "Option 3" },
];

const defaultOption = options[0].label;

const meta: Meta<typeof Select> = {
	title: "Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		selectedValue: {
			control: { type: "select", options: options.map((option) => option.label) },
		},
		arrowIcon:{
			control: { type: null },
		}
	},
	args: {
		options,
		selectedValue: defaultOption,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = (args: Story) => {
	const [selectedValue, setSelectedValue] = useState(defaultOption);

	const handleChange = (value: string) => {
		const result = options.find((val) => val.value === value)?.label || "";
		action("onChange")(result);
		setSelectedValue(result);
	};

	return <Select {...args} options={options} selectedValue={selectedValue} onChange={handleChange}/>;
};
