import type { Meta, StoryObj } from "@storybook/react";
import ChallengesSection from "./challenges-section";

const meta: Meta<typeof ChallengesSection> = {
  title: "Home/ChallengesSection",
  component: ChallengesSection,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ChallengesSection>;

export const Default: Story = {
  render: () => <ChallengesSection />,
};
