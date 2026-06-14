import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Agent Leads CRM",
  title: {
    default: "Agent Leads CRM",
    template: "%s | Agent Leads CRM",
  },
  description: "A mobile-first sales lead management CRM for field agents.",
  icons: {
    icon: "/ai-assistant-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#625cf4",
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
