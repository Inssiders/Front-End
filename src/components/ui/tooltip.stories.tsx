import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip content goes here.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
