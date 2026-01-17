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

export const metadata = {
  title: "Bakelogy | Home Baker in Nagpur",
  description: "Custom cakes, brownies & desserts in Nagpur",
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
      <body className="bg-beige text-dark-blue antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
