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
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT,
  privateKey: JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!)[
    "private_key"
  ],
} as ServiceAccount;

export const adminApp = !getApps().length
  ? initializeApp(
      {
        credential: cert(serviceAccount),
        storageBucket: "gs://usmle-bros-test.appspot.com",
      },
      "usmle-bros-test"
    )
  : getApps()[0];

export const firestore = getFirestore(adminApp);

export const bucket = getStorage(adminApp).bucket(
  "gs://usmle-bros-test.appspot.com"
);

export const auth = getAuth(adminApp);
