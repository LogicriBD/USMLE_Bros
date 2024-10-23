import { appStore } from "@/src/context/store/redux-store";
import { auth } from "./firebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authActions } from "@/src/context/store/slices/auth-slice";

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    console.log(userCredential);
    const idToken = await userCredential.user.getIdToken();
    appStore().dispatch(
      authActions.login({
        idToken,
        refresh: userCredential.user.refreshToken,
        isLoggedIn: true,
      })
    );
  }
  return userCredential;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    console.log(userCredential);
    const idToken = await userCredential.user.getIdToken();
    appStore().dispatch(
      authActions.login({
        idToken,
        refresh: userCredential.user.refreshToken,
        isLoggedIn: true,
      })
    );
  }
  return userCredential;
};

export const logout = async () => {
  try {
    await signOut(auth);
    appStore().dispatch(authActions.logout());
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
