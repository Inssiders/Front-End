import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog Title</DialogTitle>
        <p>Dialog content goes here.</p>
      </DialogContent>
    </Dialog>
  ),
};
