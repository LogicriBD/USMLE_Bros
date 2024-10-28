import { register } from "@/database/config/auth";
import { User } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { Action, FormResponse } from "@/types/Action";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserSignUpAction implements Action<FormResponse> {
  constructor(
    private payload: { email: string; password: string; name: string }
  ) {}
  async execute(): Promise<FormResponse> {
    try {
      await User.createGeneralUser(this.payload.email, this.payload.name);
      const userCredential: UserCredential = await register(
        this.payload.email,
        this.payload.password
      );
      if (userCredential && userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        appStore.dispatch(
          authActions.login({
            idToken,
            refresh: userCredential.user.refreshToken,
            isLoggedIn: true,
          })
        );
        return {
          success: true,
        };
      } else {
        throw new ApiError(400, "User not found");
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      return {
        success: false,
        message: "Could not register user, something went wrong",
      };
    }
  }
}
