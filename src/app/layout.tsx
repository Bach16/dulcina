import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import icon from "./favicon.webp";
import { obtenerAño, obtenerFechaActual } from "./utils/utils";
import Head from "next/head";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import 'dotenv/config'
import MicrosoftClarity from "./metrics/MicrosoftClarity";
import dynamic from "next/dynamic";

// Importar PixelTracker dinámicamente para evitar problemas de SSR
const PixelTracker = dynamic(() => import("../components/PixelTracker"), { 
  ssr: false 
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Dulcina - Arreglos de chocolates en quito ${obtenerAño()}`,
  description: `Arreglos de chocolates en Quito para toda ocasión. Sorprende con regalos únicos y artesanales, atención personalizada y entrega confiable. ¡Cotiza tu regalo!`,
  keywords: [
    "Arreglos de chocolates en quito",
    "Regalos de chocolates quito",
    "Regalos a domicilio quito",
    "Dulcina chocolates",
    "Dulcina chocolates quito",
  ],
  icons: {
    icon: icon.src,
  },
  alternates: {
    canonical: "https://www.dulcinachocolates.com",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1813866265831966');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      {process.env.NEXT_ENV === "production" && (
        <>
          <MicrosoftClarity id={process.env.NEXT_CLARITY_ID} />
          <GoogleTagManager gtmId={`${process.env.NEXT_GOOGLE_GTM}`} />
        </>
      )}

      <body className={`${inter.className}`}>
        {/* Facebook Pixel Tracker */}
        <PixelTracker />

        {process.env.NEXT_ENV === "production" && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_GOOGLE_GTM}`}
                height="0"
                width="0"
                className="hidden invisible"
              ></iframe>
            </noscript>
            
            {/* Facebook Pixel Noscript */}
            <noscript>
              <img 
                height="1" 
                width="1" 
                style={{display: 'none'}}
                src="https://www.facebook.com/tr?id=1813866265831966&ev=PageView&noscript=1"
                alt=""
              />
            </noscript>
          </>
        )}

        {children}
      </body>
    </html>
  );
}