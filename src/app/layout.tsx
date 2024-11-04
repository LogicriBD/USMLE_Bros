import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
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

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "USMLE Bros | Get your USMLE study materials",
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
        className={`${openSans.className} antialiased`}
      >
        <StoreProvider>
          <AuthStateManager>
            <Loader />
            <Navbar />
            <main className="md:min-h-screen">
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
