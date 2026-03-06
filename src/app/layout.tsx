import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Adventurous Eklavya | Big Adventures of a Curious Explorer",
  description:
    "Welcome to Eklavya's adventure world! A 7-year-old explorer who loves traveling, cricket, skating, dancing, singing, and acting.",
  keywords: ["Eklavya", "adventure", "kids", "explorer", "travel"],
  icons: {
    icon: "/favicon.ico",
  },
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
