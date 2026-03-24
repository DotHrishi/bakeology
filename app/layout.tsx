import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakelogy.vercel.app'),
  title: {
    default: "Bakelogy | Premium Home Baker in Nagpur",
    template: "%s | Bakelogy Nagpur"
  },
  description: "Premium home-baked custom cakes, brownies, and fine desserts in Nagpur. Order fresh, high-quality sweet treats for birthdays, celebrations, and bulk orders.",
  keywords: ["home baker Nagpur", "custom cakes Nagpur", "brownies Nagpur", "best bakery Nagpur", "order cakes online Nagpur", "Bakelogy Nagpur", "desserts Nagpur"],
  authors: [{ name: "Bakelogy" }],
  creator: "Bakelogy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bakelogy.vercel.app",
    title: "Bakelogy | Premium Home Baker in Nagpur",
    description: "Premium home-baked custom cakes, brownies, and fine desserts in Nagpur.",
    siteName: "Bakelogy",
    images: [{
      url: "/hero.png",
      width: 1200,
      height: 630,
      alt: "Bakelogy Desserts",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakelogy | Premium Home Baker in Nagpur",
    description: "Premium home-baked custom cakes, brownies, and fine desserts in Nagpur.",
    images: ["/hero.png"],
  },
  icons: {
    icon: "/bakeology-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              "name": "Bakelogy",
              "image": "https://bakelogy.vercel.app/hero.png",
              "url": "https://bakelogy.vercel.app",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nagpur",
                "addressRegion": "MH",
                "addressCountry": "IN"
              },
              "priceRange": "$$",
              "servesCuisine": "Desserts, Cakes, Brownies",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ]
              }
            })
          }}
        />
      </head>
      <body className="bg-beige text-dark-blue antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
