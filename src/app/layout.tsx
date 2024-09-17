import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import icon from "./favicon.webp"
import {obtenerFechaActual} from "./utils/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dulcina",
  description: `Regalos ideales para momentos inolvidables ${obtenerFechaActual()}`,
  icons: {
    icon: icon.src
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
