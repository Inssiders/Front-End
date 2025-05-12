import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const meta: Meta = {
  title: "UI/Toast",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <ToastProvider>
        <button onClick={() => setOpen(true)}>Show Toast</button>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Toast Title</ToastTitle>
          <ToastDescription>This is a toast message.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};
