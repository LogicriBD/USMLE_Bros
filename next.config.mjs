/** @type {import('next').NextConfig} */

const nextConfig = {
  // serverRuntimeConfig: {
  //   env: {
  //     CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  //     CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  //     CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  //     CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  //     FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
  //     FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  //     FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  //   },
  // },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    API_URL: process.env.API_URL,
    GOOGLE_ADSENSE_CLIENT: process.env.GOOGLE_ADSENSE_CLIENT,
    DATA_AD_SLOT_DISPLAY_AD: process.env.DATA_AD_SLOT_DISPLAY_AD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
