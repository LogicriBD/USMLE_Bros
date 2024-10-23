import { auth } from "./firebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export const logout = async () => {
  try {
    console.log("Logging out");
    const response = await signOut(auth);
    console.log(response);
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const isUserLoggedIn = () => {
  return !!auth.currentUser;
};
