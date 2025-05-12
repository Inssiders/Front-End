import { toast } from "@/hooks/use-toast";
import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./toaster";

const meta: Meta<typeof Toaster> = {
  title: "UI/Toaster",
  component: Toaster,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <>
      <button
        onClick={() =>
          toast({
            title: "Hello, Toaster!",
            description: "This is a toast message.",
          })
        }
      >
        Show Toaster
      </button>
      <Toaster />
    </>
  ),
};
