import ConvexProvider from "@/components/convex-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  preload: true,
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "A Fully Featured Notion Clone",
  description: "This is a fully featured Notion clone built with Next.JS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ConvexProvider>
          {children}
          <Toaster />
        </ConvexProvider>
      </body>
    </html>
  );
}
