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

export const Hover: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <button
          style={{ padding: 8, border: "1px solid #ddd", borderRadius: 4 }}
        >
          Hover me (호버카드 예시)
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        HoverCard가 마우스 오버 시 애니메이션과 함께 나타납니다.
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "마우스를 올리면 HoverCard가 fade/zoom 애니메이션과 함께 나타납니다. HoverCard 컴포넌트는 Radix UI의 애니메이션 유틸리티를 사용합니다.",
      },
    },
  },
};
