import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 100 }}>
      <div style={{ height: 300 }}>Scrollable Content</div>
    </ScrollArea>
  ),
};
