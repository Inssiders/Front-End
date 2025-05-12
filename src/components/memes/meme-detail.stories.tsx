import type { Meta, StoryObj } from "@storybook/react";
import { MemeDetail } from "./meme-detail";

const meta: Meta<typeof MemeDetail> = {
  title: "Memes/MemeDetail",
  component: MemeDetail,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof MemeDetail>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
