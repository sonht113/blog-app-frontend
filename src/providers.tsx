"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
