import { ApolloProvider } from "@apollo/client";
import type { Meta, StoryObj } from "@storybook/react";
import { RumItem } from ".";
import { client } from "../../apollo-client";
import "../../index.scss";
import { Rum } from "../../types";
import "./RumItem.scss";

const dataTemplate: Partial<Rum> = {
	id: "StoryBookFakeId",
	name: "Q2",
	createdAt: 1687653792,
	require: [],
};

const meta: Meta<typeof RumItem> = {
	title: "RumItem",
	component: RumItem,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		size: "small",
		data: dataTemplate,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {
	args: {
		size: "small",
	},
	render: (args) => (
		<ApolloProvider client={client}>
			<RumItem {...args} />
		</ApolloProvider>
	),
};
