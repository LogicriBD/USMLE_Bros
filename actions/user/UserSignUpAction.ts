import { register } from "@/database/config/auth";
import { User } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action, FormResponse } from "@/types/Action";
import { FirebaseErrors } from "@/types/FirebaseErrors";
import { logger } from "@/utils/Logger";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserSignUpAction implements Action<FormResponse> {
  constructor(
    private payload: { email: string; password: string; name: string }
  ) {}
  async execute(): Promise<FormResponse> {
    try {
      const userCredential: UserCredential = await register(
        this.payload.email,
        this.payload.password
      );
      const user = await User.createGeneralUser(
        this.payload.email,
        this.payload.name
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
        appStore.dispatch(
          userActions.setData({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isBanned: user.isBanned,
            banExpiry: user.banExpiry ?? null,
          })
        );
        return {
          success: true,
        };
      } else {
        throw new ApiError(400, "User not found");
      }
    } catch (error: any) {
      logger.error(error);

      if (error.message === FirebaseErrors.EmailAlreadyInUse) {
        return {
          success: false,
          message: "Email already in use",
        };
      }
      return {
        success: false,
        message: "Could not register user, something went wrong",
      };
    }
  }
}
