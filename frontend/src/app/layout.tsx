import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import metadataProperties from "@/metadata.json";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = true
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreProvider from "../context/StoreProvider";
import { Suspense } from "react";
import ModalSelector from "@/src/components/ModalSelector";
const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = metadataProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logos/icon.png" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-100">
            {children}
          </main>
          <Suspense fallback={null}>
            <ModalSelector />
          </Suspense>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
