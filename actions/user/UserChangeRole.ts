import { User } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { Roles } from "@/utils/enums/Roles";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class UserChangeRole implements Action<void> {
  constructor(private payload: { id: string; role: Roles }) {}

  async execute(): Promise<void> {
    try {
      await User.updateUserRole(this.payload.id, this.payload.role);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
