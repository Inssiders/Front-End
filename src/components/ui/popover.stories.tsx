import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
};
