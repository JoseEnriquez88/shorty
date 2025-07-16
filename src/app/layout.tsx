import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shorty",
  description: "Shorten your URL's",
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
