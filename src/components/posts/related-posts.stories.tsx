import type { Meta, StoryObj } from "@storybook/react";
import { RelatedPosts } from "./related-posts";

const meta: Meta<typeof RelatedPosts> = {
  title: "Posts/RelatedPosts",
  component: RelatedPosts,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof RelatedPosts>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
