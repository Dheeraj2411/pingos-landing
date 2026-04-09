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
  title: "PingOS — Business Messaging OS | Unified WhatsApp, SMS & Email",
  description:
    "PingOS is the all-in-one business messaging operating system. Automate conversations, manage leads, run campaigns, and unify your inbox across WhatsApp, SMS, and email — all from a single dashboard.",
  keywords: [
    "business messaging",
    "WhatsApp API",
    "CRM",
    "marketing automation",
    "unified inbox",
    "PingOS",
  ],
  openGraph: {
    title: "PingOS — Business Messaging OS",
    description:
      "Automate conversations, manage leads, and run campaigns across WhatsApp, SMS & email.",
    type: "website",
    locale: "en_US",
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
    >
      <body className="min-h-screen bg-surface-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
