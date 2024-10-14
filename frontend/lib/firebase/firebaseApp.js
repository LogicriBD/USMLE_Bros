// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiGNC9yttUEphRHWOp0H1t7ePqTyHF2RE",
  authDomain: "usmlebros-f6ff9.firebaseapp.com",
  projectId: "usmlebros-f6ff9",
  storageBucket: "usmlebros-f6ff9.appspot.com",
  messagingSenderId: "43192811413",
  appId: "1:43192811413:web:14c4c6357d03b95a33809c",
  measurementId: "G-MWS401939N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default app;
