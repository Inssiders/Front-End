import type { Meta, StoryObj } from "@storybook/react";
import VideoGrid from "./video-grid";

const meta: Meta<typeof VideoGrid> = {
  title: "Intro/VideoGrid",
  component: VideoGrid,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VideoGrid>;

export const Default: Story = {
  render: () => <VideoGrid />,
};
