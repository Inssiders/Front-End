import type { Meta, StoryObj } from "@storybook/react";
import { PostComments } from "./post-comments";

const meta: Meta<typeof PostComments> = {
  title: "Posts/PostComments",
  component: PostComments,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof PostComments>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
