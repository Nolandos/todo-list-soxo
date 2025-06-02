import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Recruitment task for the SOXO company",
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
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
              <main className="flex grow pt-[120px] justify-center pb-8">
                  {children}
              </main>
          <Footer/>
          </div>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
