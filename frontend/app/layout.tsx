import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import metadataProperties from "@/metadata.json";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = metadataProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
