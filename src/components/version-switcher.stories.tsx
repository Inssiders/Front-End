import type { Meta, StoryObj } from "@storybook/react";
import { VersionSwitcher } from "./version-switcher";

const meta: Meta<typeof VersionSwitcher> = {
  title: "Misc/VersionSwitcher",
  component: VersionSwitcher,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VersionSwitcher>;

export const Default: Story = {
  render: () => <VersionSwitcher versions={[]} defaultVersion={""} />,
};
