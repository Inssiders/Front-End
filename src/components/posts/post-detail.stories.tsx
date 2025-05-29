import type { Meta, StoryObj } from "@storybook/react";
import { PostDetail } from "./post-detail";

const meta: Meta<typeof PostDetail> = {
  title: "Posts/PostDetail",
  component: PostDetail,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof PostDetail>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
