import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import Navbar from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = true
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreProvider from "../context/StoreProvider";
import { Suspense } from "react";
import ModalSelector from "@/src/components/ModalSelector";
import AuthStateManager from "../context/AuthStateManager";
import Loader from "../components/Loader/Loader";
import { appStore } from "../context/store/redux-store";
import { loaderActions } from "../context/store/slices/loader-slice";
const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "USMLE Bros",
  description: "USMLE Bros is a platform for medical students to share and learn from each other.",
  authors: [{
    name: "USMLE Bros",
    url: "https://usmle-bros.vercel.app/",
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
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  appStore.dispatch(loaderActions.authTurnOn());
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logos/icon.png" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <StoreProvider>
          <AuthStateManager>
            <Loader />
            <Navbar />
            <main className="min-h-screen bg-gray-100">
              {children}
            </main>
            <Suspense fallback={<Loader />}>
              <ModalSelector />
            </Suspense>
          </AuthStateManager>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
