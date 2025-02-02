import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Swapnapurti Camping",
  description: "Experience the adventure of a lifetime with Swapnapurti Camping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-space-grotesk antialiased">
        {children}
      </body>
    </html>
  );
}

