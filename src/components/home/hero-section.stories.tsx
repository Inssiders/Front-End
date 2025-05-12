import type { Meta, StoryObj } from "@storybook/react";
import HeroSection from "./hero-section";

const meta: Meta<typeof HeroSection> = {
  title: "Home/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  render: () => <HeroSection />,
};
