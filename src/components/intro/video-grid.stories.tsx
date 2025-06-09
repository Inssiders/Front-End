import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import VideoGrid from "./video-grid";

const meta: Meta<typeof VideoGrid> = {
  title: "Components/Intro/VideoGrid",
  component: VideoGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    gridSize: {
      control: { type: "range", min: 6, max: 24, step: 3 },
      description: "Size of the grid (total width/height)",
    },
    cellSize: {
      control: { type: "range", min: 40, max: 120, step: 10 },
      description: "Size of each cell in pixels",
    },
    gapSize: {
      control: { type: "range", min: 2, max: 12, step: 2 },
      description: "Gap between grid cells in pixels",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    gifUrls: {
      control: "object",
      description: "Array of GIF URLs to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoGrid>;

// Wrapper component to handle state
const VideoGridWrapper = (args: any) => {
  const [showFrames, setShowFrames] = useState(false);
  return (
    <div className="h-[600px] w-[800px]">
      <VideoGrid {...args} showFrames={showFrames} onToggleShowFrames={setShowFrames} />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: (args) => <VideoGridWrapper {...args} />,
  args: {
    gridSize: 12,
    cellSize: 60,
    gapSize: 4,
    className: "",
    gifUrls: [
      "gif/meme1.gif",
      "gif/meme2.gif",
      "gif/meme3.gif",
      "gif/meme4.gif",
      "gif/meme5.gif",
      "gif/meme6.gif",
      "gif/meme7.gif",
      "gif/meme8.gif",
      "gif/meme9.gif",
    ],
  },
};

// Small Grid story
export const SmallGrid: Story = {
  render: (args) => <VideoGridWrapper {...args} />,
  args: {
    ...Default.args,
    gridSize: 6,
    cellSize: 40,
    gapSize: 2,
  },
};

// Large Grid story
export const LargeGrid: Story = {
  render: (args) => <VideoGridWrapper {...args} />,
  args: {
    ...Default.args,
    gridSize: 24,
    cellSize: 100,
    gapSize: 8,
  },
};

// Custom GIFs story
export const CustomGIFs: Story = {
  render: (args) => <VideoGridWrapper {...args} />,
  args: {
    ...Default.args,
    gifUrls: ["gif/custom1.gif", "gif/custom2.gif", "gif/custom3.gif", "gif/custom4.gif"],
  },
};

// Mobile View story
export const MobileView: Story = {
  render: (args) => (
    <div className="h-[480px] w-[320px]">
      <VideoGridWrapper {...args} />
    </div>
  ),
  args: {
    ...Default.args,
    gridSize: 9,
    cellSize: 40,
    gapSize: 2,
  },
};

// Responsive Grid story
export const ResponsiveGrid: Story = {
  render: (args) => (
    <div className="mx-auto h-screen w-full max-w-[1200px]">
      <VideoGridWrapper {...args} />
    </div>
  ),
  args: {
    ...Default.args,
    className: "w-full h-full",
  },
};
