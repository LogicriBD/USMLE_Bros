import { User } from "@/database/repository/User";
import { routes } from "@/src/api/Routes";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { FetchHandler } from "@/utils/RequestHandler";
import { ApiError } from "next/dist/server/api-utils";

type DeleteUser = {
  email: string;
};

export class UserDelete implements Action<void> {
  constructor(private payload: { id: string }) {}

  async execute(): Promise<void> {
    try {
      const userData = await User.findUserById(this.payload.id);
      const fetchHandler = new FetchHandler<DeleteUser>();
      await fetchHandler.postRequest(routes.user.delete, {
        email: userData.email,
      });
      await User.deleteUser(this.payload.id);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
