import { login } from "@/database/config/auth";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action } from "@/types/Action";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserLoginAction implements Action<void> {
  constructor(private payload: { email: string; password: string }) {}
  async execute(): Promise<void> {
    try {
      const userCredential: UserCredential = await login(
        this.payload.email,
        this.payload.password
      );
      if (userCredential && userCredential.user && userCredential.user.email) {
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem("idToken", idToken || "");
        localStorage.setItem("refresh", userCredential.user.refreshToken || "");
        appStore.dispatch(
          authActions.login({
            idToken,
            refresh: userCredential.user.refreshToken,
            isLoggedIn: true,
          })
        );
        appStore.dispatch(userActions.setEmail(userCredential.user.email));
      } else {
        throw new ApiError(400, "User not found");
      }
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
