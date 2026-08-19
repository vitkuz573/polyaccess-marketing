import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { appUrl, siteName } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl()),
  title: {
    default: `${siteName()} — Secure Access Infrastructure for Multi-Product Teams`,
    template: `%s | ${siteName()}`,
  },
  description:
    "PolyAccess provides secure access infrastructure for multi-product teams: challenge-protected endpoints, API key management, customer portals, and status pages.",
  applicationName: siteName(),
  keywords: [
    "access infrastructure",
    "API security",
    "challenge proxy",
    "API keys",
    "customer portal",
    "status page",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteName(),
    title: `${siteName()} — Secure Access Infrastructure`,
    description:
      "Ship secure, scalable access primitives for every product in your stack.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName()} — Secure Access Infrastructure`,
    description:
      "Ship secure, scalable access primitives for every product in your stack.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
