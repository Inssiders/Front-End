import type { Meta, StoryObj } from "@storybook/react";
import CategoriesSection from "./categories-section";

const meta: Meta<typeof CategoriesSection> = {
  title: "Home/CategoriesSection",
  component: CategoriesSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CategoriesSection>;

export const Default: Story = {
  render: () => <CategoriesSection />,
};
