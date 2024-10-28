import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { app } from "./firebaseApp";

const auth = getAuth(app);

type Action = (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential>;

const persistUserLoginState = async (
  email: string,
  password: string,
  action: Action
) => {
  return setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return action(auth, email, password);
    })
    .catch((error) => {
      throw Error(error);
    });
};

export const register = async (email: string, password: string) => {
  const userCredential = await persistUserLoginState(
    email,
    password,
    createUserWithEmailAndPassword
  );
  return userCredential;
};

export const login = async (email: string, password: string) => {
  const userCredential = await persistUserLoginState(
    email,
    password,
    signInWithEmailAndPassword
  );
  return userCredential;
};

export const logout = async () => {
  try {
    const response = await signOut(auth);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    }
    return null;
  });
};

export const isUserLoggedIn = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      return true;
    }
    return false;
  });
};
