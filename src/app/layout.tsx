import { NextLayout, NextProvider } from "@/components/provider";
import type { Metadata } from "next";

import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "인싸이더 - 트렌드의 모든 것",
  description:
    "인싸 문화, 밈, 인플루언서, 연예인을 중심으로 한 트렌디한 플랫폼",
  manifest: "/manifest.json",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
