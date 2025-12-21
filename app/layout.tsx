import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "bouquets.by.tanya - Изкуствени цветни букети",
  description: "Висококачествени изкуствени цветни букети за всеки повод. Ръчно изработени с внимание към детайла.",
  keywords: "букети, изкуствени цветя, рози, подаръци, България",
  openGraph: {
    title: "bouquets.by.tanya",
    description: "Изкуствени цветни букети от висококачествени материали",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
