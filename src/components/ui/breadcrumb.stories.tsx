import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>Library</BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>Data</BreadcrumbItem>
    </Breadcrumb>
  ),
};
