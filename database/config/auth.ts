import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { UserFetchByEmailAction } from "@/actions/user/UserFetchByEmailAction";
import Cookies from "js-cookie";
import { logger } from "@/utils/Logger";
import { UserLogoutAction } from "@/actions/user/UserLogoutAction";
import { auth } from "./firebaseApp";

const persistUserLoginStateGoogleAuth = async (
  provider: GoogleAuthProvider
) => {
  return setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithPopup(auth, provider);
    })
    .catch((error) => {
      throw Error(error);
    });
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const userCredential = await persistUserLoginStateGoogleAuth(provider);
  const idToken = await userCredential.user.getIdToken(true);
  setAccessTokenInCookie(idToken);
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
        setAccessTokenInCookie(idToken);
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

export const setAccessTokenInCookie = (token: string) => {
  Cookies.set("access", token, {
    expires: new Date(new Date().getTime() + 55 * 60 * 1000),
  });
};
