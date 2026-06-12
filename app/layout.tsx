import type { Metadata } from "next";
import "./globals.css";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`;
const siteTitle = "Nicholas Fortune | Full Stack, Frontend & Backend Engineer";
const siteDescription =
  "Portfolio of Nicholas Fortune, a full stack, frontend, and backend engineer building scalable web, mobile, CRM, backend API, and real-time systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Nicholas Fortune",
  },
  description: siteDescription,
  keywords: [
    "Nicholas Fortune",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "NestJS Developer",
    "PostgreSQL",
    "Real-time Systems",
    "CRM Platforms",
  ],
  authors: [{ name: "Nicholas Fortune", url: "/" }],
  creator: "Nicholas Fortune",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nicholas Fortune Portfolio",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nicholas Fortune - Full Stack, Frontend, and Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
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
