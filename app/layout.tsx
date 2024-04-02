import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

import type { Metadata } from "next";
import "./globals.css";

const fontFamily = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malingo",
  description: "Learn, practice, and master new languages with Malingo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={fontFamily.className}>
          <Toaster />

          <ExitModal />
          <HeartsModal />
          <PracticeModal />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
