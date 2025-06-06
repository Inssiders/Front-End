import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

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

export const Hover: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button style={{ padding: 8, border: "1px solid #ddd", borderRadius: 4 }}>
            Hover me (툴팁 예시)
          </button>
        </TooltipTrigger>
        <TooltipContent>Tooltip이 마우스 오버 시 애니메이션과 함께 나타납니다.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "마우스를 올리면 Tooltip이 fade/zoom 애니메이션과 함께 나타납니다. Tooltip 컴포넌트는 Radix UI의 애니메이션 유틸리티를 사용합니다.",
      },
    },
  },
};
