import { User } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class UserDelete implements Action<void> {
  constructor(private payload: { id: string }) {}

  async execute(): Promise<void> {
    try {
      await User.deleteUser(this.payload.id);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
