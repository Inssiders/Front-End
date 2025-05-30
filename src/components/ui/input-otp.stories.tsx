import type { Meta, StoryObj } from "@storybook/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";

const meta: Meta<typeof InputOTP> = {
  title: "UI/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSeparator />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSeparator />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};
