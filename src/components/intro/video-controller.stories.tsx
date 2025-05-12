import type { Meta, StoryObj } from "@storybook/react";
import VideoController from "./video-controller";

const meta: Meta<typeof VideoController> = {
  title: "Intro/VideoController",
  component: VideoController,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof VideoController>;

export const Default: Story = {
  render: () => <VideoController videoIds={[]} />,
};
