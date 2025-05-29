import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Skeleton style={{ height: 20, marginBottom: 8 }} />
      <Skeleton style={{ height: 20, width: "80%" }} />
    </div>
  ),
};
