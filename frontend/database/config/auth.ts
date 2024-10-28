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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    }
    return null;
  });
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
        await userFetchByEmailAction.execute();
      } else {
        appStore.dispatch(authActions.setSessionStatus(false));
        appStore.dispatch(authActions.logout());
      }
      appStore.dispatch(loaderActions.authTurnOff());
    },
    (error) => {
      console.error(error);
      appStore.dispatch(authActions.setSessionStatus(false));
      appStore.dispatch(authActions.logout());
      appStore.dispatch(loaderActions.authTurnOff());
    }
  );
};
