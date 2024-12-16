import { signInWithGoogle } from "@/database/config/auth";
import { User } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action, FormResponse } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class GoogleSignInAction implements Action<FormResponse> {
  constructor() {}
  async execute(): Promise<FormResponse> {
    try {
      const userCredential: UserCredential = await signInWithGoogle();
      if (userCredential && userCredential.user && userCredential.user.email) {
        const userData = await User.createGeneralUserWithExistsCheck(
          userCredential.user.email,
          userCredential.user.displayName ??
            userCredential.user.email.split("@")[0]
        );
        if (!userData) {
          throw new ApiError(400, "User not found");
        }
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
      logger.error(error.message);
      return {
        success: false,
        message: "Could not login user, something went wrong",
      };
    }
  }
}
