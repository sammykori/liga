"use client"; // 👈 This makes it a Client Component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient()); // Ensure it's created once

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
