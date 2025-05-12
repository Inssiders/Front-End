import type { Meta, StoryObj } from "@storybook/react";
import { ChartContainer } from "./chart";

const meta: Meta<typeof ChartContainer> = {
  title: "UI/ChartContainer",
  component: ChartContainer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  // ChartContainer는 필수 props(config, children)가 있습니다. 아래 예시를 실제 데이터에 맞게 수정하세요.
  render: () => (
    <ChartContainer config={{}}>
      {/* 차트 컴포넌트(children) 예시를 여기에 추가하세요 */}
      <div>Chart goes here</div>
    </ChartContainer>
  ),
};
