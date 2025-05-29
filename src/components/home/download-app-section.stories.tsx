import type { Meta, StoryObj } from "@storybook/react";
import DownloadAppSection from "./download-app-section";

const meta: Meta<typeof DownloadAppSection> = {
  title: "Home/DownloadAppSection",
  component: DownloadAppSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DownloadAppSection>;

export const Default: Story = {
  render: () => <DownloadAppSection />,
};
