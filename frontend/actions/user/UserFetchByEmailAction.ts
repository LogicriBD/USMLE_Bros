import { User, UserData } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class UserFetchByEmailAction implements Action<UserData> {
  constructor(private payload: { email: string }) {}
  async execute(): Promise<UserData> {
    try {
      const user: UserData = await User.findUserByEmail(this.payload.email);
      console.log(user);
      appStore.dispatch(
        userActions.setData({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        })
      );
      return user;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
