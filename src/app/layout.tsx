import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Google Sans alternative - usando Inter que es similar
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Brunette - Gemini AI",
  description: "Chat con Google Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
