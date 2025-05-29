import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./form";
import { Input } from "./input";

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <Form>
      <label htmlFor="name">Name</label>
      <Input id="name" placeholder="Enter your name" />
      <button type="submit">Submit</button>
    </Form>
  ),
};
