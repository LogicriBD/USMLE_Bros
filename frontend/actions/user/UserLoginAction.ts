import { login } from "@/database/config/auth";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action, FormResponse } from "@/types/Action";
import { FirebaseErrors } from "@/types/FirebaseErrors";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserLoginAction implements Action<FormResponse> {
  constructor(private payload: { email: string; password: string }) {}
  async execute(): Promise<FormResponse> {
    try {
      const userCredential: UserCredential = await login(
        this.payload.email,
        this.payload.password
      );
      if (userCredential && userCredential.user && userCredential.user.email) {
        const idToken = await userCredential.user.getIdToken();
        appStore.dispatch(
          authActions.login({
            idToken,
            refresh: userCredential.user.refreshToken,
            isLoggedIn: true,
          })
        );
        appStore.dispatch(userActions.setEmail(userCredential.user.email));
        return {
          success: true,
        };
      } else {
        throw new ApiError(400, "Internal Server Error");
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error(error.message);
      }
      if (error.message === FirebaseErrors.InvalidCredentials) {
        return {
          success: false,
          message: "Incorrect email or password",
        };
      } else {
        return {
          success: false,
          message: "Could not login user, something went wrong",
        };
      }
    }
  }
}
