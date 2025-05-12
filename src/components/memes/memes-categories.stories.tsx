import type { Meta, StoryObj } from "@storybook/react";
import MemesCategories from "./memes-categories";

const meta: Meta<typeof MemesCategories> = {
  title: "Memes/MemesCategories",
  component: MemesCategories,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof MemesCategories>;

export const Default: Story = {
  render: () => <MemesCategories />,
};
