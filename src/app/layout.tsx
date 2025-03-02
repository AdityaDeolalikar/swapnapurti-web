import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from 'next/script';
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQ507D7KN7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BQ507D7KN7');
          `}
        </Script>
      </head>
      <body className="font-space-grotesk antialiased">
        {children}
      </body>
    </html>
  );
}

