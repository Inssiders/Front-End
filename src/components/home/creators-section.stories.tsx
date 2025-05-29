import type { Meta, StoryObj } from "@storybook/react";
import CreatorsSection from "./creators-section";

const meta: Meta<typeof CreatorsSection> = {
  title: "Home/CreatorsSection",
  component: CreatorsSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CreatorsSection>;

export const Default: Story = {
  render: () => <CreatorsSection />,
};
