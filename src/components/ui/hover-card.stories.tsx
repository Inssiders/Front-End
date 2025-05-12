import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <button>Hover me</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>HoverCard content goes here.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
