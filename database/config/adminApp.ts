import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT,
  privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "{}")[
    "private_key"
  ],
} as ServiceAccount;

export const adminApp = !getApps().length
  ? initializeApp(
      {
        credential: cert(serviceAccount),
        // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      },
      "usmle-bros-test"
    )
  : getApps()[0];

export const firestore = getFirestore(adminApp);

export const bucket = getStorage(adminApp).bucket(
  process.env.FIREBASE_STORAGE_BUCKET
);

export const auth = getAuth(adminApp);
