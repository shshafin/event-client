"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster
          richColors
          position="top-center"
          closeButton
        />
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
}
