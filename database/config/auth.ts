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
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { UserFetchByEmailAction } from "@/actions/user/UserFetchByEmailAction";
import Cookies from "js-cookie";
import { logger } from "@/utils/Logger";
import { UserLogoutAction } from "@/actions/user/UserLogoutAction";

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
  const idToken = await userCredential.user.getIdToken(true);
  Cookies.set(
    "access",
    idToken,
    JSON.parse(process.env.NEXT_PUBLIC_COOKIE_SAFETY!)
  );
  return userCredential;
};

export const login = async (email: string, password: string) => {
  const userCredential = await persistUserLoginState(
    email,
    password,
    signInWithEmailAndPassword
  );
  const idToken = await userCredential.user.getIdToken(true);
  Cookies.set(
    "access",
    idToken,
    JSON.parse(process.env.NEXT_PUBLIC_COOKIE_SAFETY!)
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
  return auth.currentUser;
};

export const validateUserSession = () => {
  onAuthStateChanged(
    auth,
    async (user) => {
      if (user) {
        appStore.dispatch(authActions.setSessionStatus(true));
        const userFetchByEmailAction = new UserFetchByEmailAction({
          email: user.email!,
        });
        const idToken = await user.getIdToken(true);
        Cookies.set(
          "access",
          idToken,
          JSON.parse(process.env.NEXT_PUBLIC_COOKIE_SAFETY!)
        );
        await userFetchByEmailAction.execute();
      } else {
        const logoutAction = new UserLogoutAction();
        await logoutAction.execute();
      }
      appStore.dispatch(loaderActions.authTurnOff());
      return user;
    },
    async (error) => {
      logger.error(error);
      const logoutAction = new UserLogoutAction();
      await logoutAction.execute();
      appStore.dispatch(loaderActions.authTurnOff());
    }
  );
};
