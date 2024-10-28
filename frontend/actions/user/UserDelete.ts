import { User } from "@/database/repository/User";
import { deleteUser } from "@/src/lib/deleteUser";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class UserDelete implements Action<void> {
  constructor(private payload: { id: string }) {}

  async execute(): Promise<void> {
    try {
      const userData = await User.findUserById(this.payload.id);
      await deleteUser(userData.email);
      await User.deleteUser(this.payload.id);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
