import type { Meta, StoryObj } from "@storybook/react";
import NextAuthSessionProvider from "./session-provider";

const meta: Meta<typeof NextAuthSessionProvider> = {
  title: "Auth/SessionProvider",
  component: NextAuthSessionProvider,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NextAuthSessionProvider>;

export const Default: Story = {
  render: () => <NextAuthSessionProvider>children</NextAuthSessionProvider>,
};
