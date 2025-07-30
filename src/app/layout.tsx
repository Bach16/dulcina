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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Dulcina - Arreglos de chocolates quito ${obtenerAño()}`,
  description: `Arreglos de chocolates en Quito para toda ocasión. Sorprende con regalos únicos y artesanales, atención personalizada y entrega confiable. ¡Cotiza tu regalo!`,
  keywords: [
    "Arreglos de chocolates quito",
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
      {process.env.NEXT_ENV === "production" && (
        <>
          <MicrosoftClarity id={process.env.NEXT_CLARITY_ID} />
          <GoogleTagManager gtmId={`${process.env.NEXT_GOOGLE_GTM}`} />
        </>
      )}

      <body className={`${inter.className}`}>
        {process.env.NEXT_ENV === "production" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_GOOGLE_GTM}`}
              height="0"
              width="0"
              className="hidden invisible"
            ></iframe>
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
