import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { DataSourceProvider } from "@/contexts/data-source-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pretendard = Inter({ subsets: ["latin"], variable: "--font-pretendard" })

export const metadata: Metadata = {
  title: "인싸이더 - 트렌드의 모든 것",
  description: "인싸 문화, 밈, 인플루언서, 연예인을 중심으로 한 트렌디한 플랫폼",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <DataSourceProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </DataSourceProvider>
      </body>
    </html>
  )
}
