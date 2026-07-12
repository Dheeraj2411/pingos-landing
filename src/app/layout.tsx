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
    process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.startsWith("http")
        ? process.env.NEXT_PUBLIC_SITE_URL
        : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://pingos.me"
  ),
  title: {
    default: "PingOS — Official WhatsApp Business API (WABA) Messaging OS",
    template: "%s | PingOS",
  },
  description:
    "PingOS is the #1 WhatsApp Business Messaging OS. Automate lead generation, scale sales with Official WABA API, and manage Click-to-WhatsApp ads with precision from one unified dashboard.",
  keywords: [
    "WhatsApp Business API",
    "WABA OS",
    "WhatsApp CRM",
    "WhatsApp Automation",
    "Official WhatsApp Partner",
    "Click-to-WhatsApp Ads",
    "WhatsApp Lead Generation",
    "WABA Sales Platform",
    "Team Inbox WhatsApp",
    "WhatsApp Bot Builder",
  ],
  authors: [{ name: "PingOS Team" }],
  creator: "PingOS",
  publisher: "PingOS",
  applicationName: "PingOS",
  category: "Business",
  classification: "Business Software",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PingOS — Official WhatsApp Business API (WABA) Messaging OS",
    description:
      "The ultimate WhatsApp Business OS. Automate lead generation, scale sales, and manage Click-to-WhatsApp ads from one unified dashboard.",
    type: "website",
    locale: "en_US",
    siteName: "PingOS",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PingOS - WhatsApp Business Operating System",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PingOS — WhatsApp Business OS",
    description:
      "Automate lead generation and scale sales with the Official WABA API platform.",
    creator: "@PingOS",
    images: {
      url: "/og-image.png",
      alt: "PingOS Dashboard",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
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
