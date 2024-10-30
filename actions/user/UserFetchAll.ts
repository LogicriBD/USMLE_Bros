import { User, UserData } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class UserFetchAll implements Action<UserData[]> {
  constructor() {}

  async execute(): Promise<UserData[]> {
    try {
      const users: UserData[] = await User.findAllUsers();
      return users;
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
