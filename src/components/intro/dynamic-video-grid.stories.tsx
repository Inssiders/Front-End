import type { Meta, StoryObj } from "@storybook/react";
import DynamicVideoGrid from "./dynamic-video-grid";

const meta: Meta<typeof DynamicVideoGrid> = {
  title: "Intro/DynamicVideoGrid",
  component: DynamicVideoGrid,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DynamicVideoGrid>;

export const Default: Story = {
  render: () => <DynamicVideoGrid />,
};
