/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    GOOGLE_ADSENSE_CLIENT: process.env.GOOGLE_ADSENSE_CLIENT,
    DATA_AD_SLOT_DISPLAY_AD: process.env.DATA_AD_SLOT_DISPLAY_AD,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  distDir: "build",
  reactStrictMode: false,
  output: "standalone",
};

export default nextConfig;
