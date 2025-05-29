"use client";

import { MSWProvider } from "@/contexts/msw-context";
import ToasterContext from "@/contexts/toaster-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Footer from "./footer";
import Header from "./header";
import { Web3CubeLoader } from "./loader";

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const NextProvider = ({ children }: Props) => {
  return (
    <MSWProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Suspense fallback={<Web3CubeLoader />}>{children}</Suspense>
        </SessionProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="flex relative flex-col min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      <Header />
      <main className="flex-1 pt-16 flex flex-col">{children}</main>
      <ToasterContext />
      <Footer />
      <Analytics />
    </div>
  );
};
