import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <p>Drawer content goes here.</p>
      </DrawerContent>
    </Drawer>
  ),
};
