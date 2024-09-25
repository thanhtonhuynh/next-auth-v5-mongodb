import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NavBarClient from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import NavBarServer from "@/components/NavBar-server";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Next-Auth V5 Tutorial",
    absolute: "Next-Auth V5 tutorial",
  },
  description:
    "Learn how to use Auth.js v5 in Next.js with custom roles, caching, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {/* <NavBarClient /> */}
          <NavBarServer />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
