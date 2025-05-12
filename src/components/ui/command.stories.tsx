import type { Meta, StoryObj } from "@storybook/react";
import { Command, CommandInput, CommandItem, CommandList } from "./command";

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandItem>Profile</CommandItem>
        <CommandItem>Settings</CommandItem>
        <CommandItem>Logout</CommandItem>
      </CommandList>
    </Command>
  ),
};
