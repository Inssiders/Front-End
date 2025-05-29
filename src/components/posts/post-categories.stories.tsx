import type { Meta, StoryObj } from "@storybook/react";
import PostCategories from "./post-categories";

const meta: Meta<typeof PostCategories> = {
  title: "Posts/PostCategories",
  component: PostCategories,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PostCategories>;

export const Default: Story = {
  render: () => <PostCategories />,
};
