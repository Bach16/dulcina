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
  title: `Dulcina - Regalos a domicilio quito ${obtenerAño()}`,
  description: `Regalos a domicilio quito - ${obtenerFechaActual()}`,
  icons: {
    icon: icon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MicrosoftClarity />
      <GoogleTagManager gtmId="GTM-WFZVVMVD" />
      <body className={`${inter.className}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFZVVMVD"
            height="0"
            width="0"
            className="hidden invisible"
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
