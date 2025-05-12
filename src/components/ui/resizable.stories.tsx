import type { Meta, StoryObj } from "@storybook/react";
import { Resizable } from "./resizable";

const meta: Meta<typeof Resizable> = {
  title: "UI/Resizable",
  component: Resizable,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Resizable>;

export const Default: Story = {
  render: () => (
    <Resizable style={{ width: 200, height: 100, border: "1px solid #ccc" }}>
      <div style={{ padding: 16 }}>Resizable Content</div>
    </Resizable>
  ),
};
