import { register } from "@/database/config/auth";
import { User } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { Action } from "@/types/Action";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserSignUpAction implements Action<void> {
  constructor(
    private payload: { email: string; password: string; name: string }
  ) {}
  async execute(): Promise<void> {
    try {
      await User.createGeneralUser(this.payload.email, this.payload.name);
      const userCredential: UserCredential = await register(
        this.payload.email,
        this.payload.password
      );
      if (userCredential && userCredential.user) {
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
      } else {
        throw new ApiError(400, "User not found");
      }
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
