import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";

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
}>)
{
  return (
    <html lang="bg">
      <head>
        {/* Meta Pixel Code */}

        <Script id="facebook-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '821466574227785');
fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=821466574227785&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={inter.className}>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header />

              <div className="bg-rose-50 border-b border-rose-100 text-rose-700 text-sm py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3">
                  <span className="font-semibold">Доверие от над 100 щастливи клиенти</span>
                  <img src="/econt-logo.png" alt="Econt" className="h-5 inline-block" />
                </div>
              </div>

              <main className="grow">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
