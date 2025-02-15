import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const interGFont = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"]
// });

// const poppinsGFont = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: "100",
// });

const robotoGFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "Septicon",
  description: "Built with Integrity!",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: "website",
    url: "septicon.com", // To be set later!
    title: "Septicon",
    description: "Built with Integrity!",
    siteName: "Septicon",
    images: [{ url: "/favicon pack/Septicon - Logo.png" }],
  }
};

import NoteBox from "@/components/notifications";
import { NotificationProvider } from "./context/notificationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <NotificationProvider>
        <body className={`text-zinc-500 overflow-x-hidden bg-zinc-900 flex !p-2 absolute w-full h-screen !${robotoGFont.variable} antialiased`}>
          {children}
          <NoteBox />
        </body>
      </NotificationProvider>
    </html>
  );
}