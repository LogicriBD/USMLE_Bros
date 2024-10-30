import { User, UserData } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class UserFetchByIdAction implements Action<UserData | undefined> {
  constructor(private payload: { id: string }) {}
  async execute(): Promise<UserData | undefined> {
    try {
      const user: UserData = await User.findUserById(this.payload.id);
      return user;
    } catch (error: any) {
      logger.error(error);
    }
  }
}
