import type { Meta, StoryObj } from "@storybook/react";
import TrendingSection from "./trending-section";

const meta: Meta<typeof TrendingSection> = {
  title: "Home/TrendingSection",
  component: TrendingSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TrendingSection>;

export const Default: Story = {
  render: () => <TrendingSection />,
};
