import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <div>
        <button>Tab 1</button>
        <button>Tab 2</button>
      </div>
      <div>
        <div>Tab 1 Content</div>
        <div>Tab 2 Content</div>
      </div>
    </Tabs>
  ),
};
