import type { Meta, StoryObj } from "@storybook/react";
import { MemeComments } from "./meme-comments";

const meta: Meta<typeof MemeComments> = {
  title: "Memes/MemeComments",
  component: MemeComments,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof MemeComments>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
