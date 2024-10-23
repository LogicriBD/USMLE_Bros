import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;
