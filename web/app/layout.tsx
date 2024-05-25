'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type RootLayoutParams = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutParams) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
