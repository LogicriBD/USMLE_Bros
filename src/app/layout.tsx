/* eslint-disable @next/next/no-script-component-in-head */
/* eslint-disable @next/next/no-css-tags */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "@/src/components/Navbar/Navbar";
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import StoreProvider from "../context/StoreProvider";
import { Suspense } from "react";
import ModalSelector from "@/src/components/ModalSelector";
import Loader from "../components/Loader/Loader";
import { appStore } from "../context/store/redux-store";
import { loaderActions } from "../context/store/slices/loader-slice";
import Script from "next/script";
import Head from "next/head";
const AD_CLIENT = process.env.GOOGLE_ADSENSE_CLIENT;
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "USMLE Bros | Get your USMLE study materials",
  description: "USMLE Bros is a platform for medical students to share and learn from each other.",
  authors: [{
    name: "USMLE Bros",
    url: "https://usmlebros.com/",
  }, {
    name: "RobustTech BD",
    url: "https://robustechbd.com/"
  }],
  icons: [
    {
      href: "/logos/icon.png",
      sizes: "192x192",
      type: "image/png",
      url: "/logos/icon.png",
    },
  ],
  verification: {
    google: "GHbAPG5W6DW3JtjrpbiObD0IerU9kjeMc_nr4-TygEs",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  appStore.dispatch(loaderActions.authTurnOn());
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${AD_CLIENT}`}
          crossOrigin="anonymous"
        >
        </Script>
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
      </Head>
      <body
        className={`${openSans.className} antialiased`}
      >
        <StoreProvider>
          <Loader />
          <main className="h-screen flex flex-col">
            <div className="h-auto">
              <Navbar />
            </div>
            <div className="h-full items-center justify-center overflow-y-auto scrollbar-thin">
              {children}
            </div>
          </main>
          <Suspense fallback={<Loader />}>
            <ModalSelector />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
