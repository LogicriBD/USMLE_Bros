import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiGNC9yttUEphRHWOp0H1t7ePqTyHF2RE",
  authDomain: "usmlebros-f6ff9.firebaseapp.com",
  projectId: "usmlebros-f6ff9",
  storageBucket: "usmlebros-f6ff9.appspot.com",
  messagingSenderId: "43192811413",
  appId: "1:43192811413:web:14c4c6357d03b95a33809c",
  measurementId: "G-MWS401939N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app;
