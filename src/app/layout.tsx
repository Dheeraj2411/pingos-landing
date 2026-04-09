import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.ai"
  ),
  title: {
    default: "PingOS — Business Messaging OS | Unified WhatsApp, SMS & Email",
    template: "%s | PingOS",
  },
  description:
    "PingOS is the all-in-one business messaging operating system. Automate conversations, manage leads, run campaigns, and unify your inbox across WhatsApp, SMS, and email.",
  keywords: [
    "business messaging",
    "WhatsApp API",
    "CRM",
    "marketing automation",
    "unified inbox",
    "PingOS",
    "customer support",
    "B2B software",
    "omnichannel messaging",
  ],
  authors: [{ name: "PingOS Team" }],
  creator: "PingOS",
  applicationName: "PingOS",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PingOS — Business Messaging OS",
    description:
      "Automate conversations, manage leads, and run campaigns across WhatsApp, SMS & email — all from a single dashboard.",
    type: "website",
    locale: "en_US",
    siteName: "PingOS",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PingOS — Business Messaging OS",
    description:
      "Automate conversations, manage leads, and run campaigns across WhatsApp, SMS & email.",
    creator: "@PingOS",
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
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
