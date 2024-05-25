import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ino test assessment",
  description: "Ino test assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
