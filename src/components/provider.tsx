"use client";

import ToasterContext from "@/contexts/toaster-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Footer from "./footer";
import Header from "./header";
import { FullPageLoader } from "./loader";

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
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
      </SessionProvider>
    </QueryClientProvider>
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
