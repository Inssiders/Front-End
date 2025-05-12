import type { Meta, StoryObj } from "@storybook/react";
import { RelatedMemes } from "./related-memes";

const meta: Meta<typeof RelatedMemes> = {
  title: "Memes/RelatedMemes",
  component: RelatedMemes,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof RelatedMemes>;

export const Default: Story = {
  args: {
    id: "1",
  },
};
