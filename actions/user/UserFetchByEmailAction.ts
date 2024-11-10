import { User, UserData } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class UserFetchByEmailAction implements Action<UserData | undefined> {
  constructor(private payload: { email: string }) {}
  async execute(): Promise<UserData | undefined> {
    try {
      const user: UserData = await User.findUserByEmail(this.payload.email);
      appStore.dispatch(
        userActions.setData({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isBanned: user.isBanned,
          banExpiry: user.banExpiry ?? null
        })
      );
      return user;
    } catch (error: any) {
      logger.error(error);
    }
  }
}
