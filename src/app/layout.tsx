import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const SITE_URL = "https://adventurous-eklavya.vercel.app";
const TITLE = "Adventurous Eklavya 🌍 Big Adventures of a Little Explorer";
const DESCRIPTION =
  "Come play in Eklavya's adventure world! Watch his karate moves, fly a plane around the page, follow his trips to 7 countries and count down to his birthday.";

// Share images (opengraph-image.png / twitter-image.png) and icons live in src/app
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Adventurous Eklavya",
  keywords: ["Eklavya", "adventure", "kids", "explorer", "travel", "karate", "cricket"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Adventurous Eklavya",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
