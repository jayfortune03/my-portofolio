import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicholas Fortune | Full Stack Engineer",
  description:
    "Portfolio of Nicholas Fortune, a full stack engineer building scalable web, mobile, CRM, and real-time systems.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
