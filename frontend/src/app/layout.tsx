import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { AIChatbot } from "@/components/dashboard/ai-chatbot";
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
  title: "TruthGuard AI — Detect Fake News, Deepfakes & AI Manipulation",
  description:
    "Advanced AI-powered verification platform for digital truth detection. Detect fake news, AI images, deepfakes, and AI-generated text instantly.",
  keywords: ["fake news detection", "deepfake", "AI detection", "cyber intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <body className="min-h-full flex flex-col antialiased">
          <ThemeProvider>
            {children}
            <AIChatbot />
            <Toaster theme="dark" position="top-right" richColors />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
