import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandName - Modern Authentication",
  description: "Secure and beautiful authentication system for your applications",
  keywords: "authentication, signup, login, nextjs, react",
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased min-h-screen
        `}
      >
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-3xl" />
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Toast Container */}
        <div id="toast-root" className="fixed bottom-4 right-4 z-50" />
      </body>
    </html>
  );
}