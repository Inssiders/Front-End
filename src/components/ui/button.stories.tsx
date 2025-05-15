import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    variant: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Hover: Story = {
  args: {
    children: "Hover 상태",
  },
  parameters: {
    docs: {
      description: {
        story: "마우스를 올리면 색상이 변하는 hover 효과를 확인할 수 있습니다.",
      },
    },
  },
  render: (args) => (
    <Button {...args} style={{ transition: "all 0.2s" }}>
      {args.children}
    </Button>
  ),
};

export const Active: Story = {
  args: {
    children: "Active 상태",
  },
  parameters: {
    docs: {
      description: {
        story: "버튼을 클릭(Active)했을 때의 스타일을 확인할 수 있습니다.",
      },
    },
  },
  render: (args) => (
    <Button {...args} style={{ boxShadow: "0 0 0 2px #6366f1" }}>
      {args.children}
    </Button>
  ),
};
