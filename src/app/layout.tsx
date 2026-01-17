import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BrewHaven Cafe | Premium Coffee Experience at Everyday Prices",
  description: "Budget-friendly Starbucks alternative coffee cafe with stunning animations and full e-commerce functionality.",
  openGraph: {
    title: "BrewHaven Cafe",
    description: "Premium coffee experience at everyday prices",
    type: "website",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-inter">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
