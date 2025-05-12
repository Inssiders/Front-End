import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./carousel";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  ),
};
