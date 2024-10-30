import { logout } from "@/database/config/auth";
import { appStore } from "@/src/context/store/redux-store";
import { authActions } from "@/src/context/store/slices/auth-slice";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";
import Cookies from "js-cookie";
import { userActions } from "@/src/context/store/slices/user-slice";

export class UserLogoutAction implements Action<void> {
  constructor() {}
  async execute(): Promise<void> {
    try {
      await logout();
      appStore.dispatch(authActions.logout());
      appStore.dispatch(userActions.clearData());
      localStorage.clear();
      Cookies.remove("access");
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
