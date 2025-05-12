import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div>
        <input type="radio" id="option1" name="group" value="option1" />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div>
        <input type="radio" id="option2" name="group" value="option2" />
        <label htmlFor="option2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};
