import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLCpJFzDtBjZQxIjC9deHXTixaz4Tij8M",
  authDomain: "usmle-bros-test.firebaseapp.com",
  projectId: "usmle-bros-test",
  storageBucket: "usmle-bros-test.appspot.com",
  messagingSenderId: "66344304971",
  appId: "1:66344304971:web:8df571e19fac56cb42a8ce",
  measurementId: "G-F8D81QNXTG",
};

export const app = initializeApp(firebaseConfig, {
  name: "usmle-bros-test",
});

export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);
