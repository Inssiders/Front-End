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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-16">{children}</main>
      <ToasterContext />
      <Footer />
      <Analytics />
    </div>
  );
};
