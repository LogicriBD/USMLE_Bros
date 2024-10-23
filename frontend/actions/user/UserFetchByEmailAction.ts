import { User, UserData } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class UserFetchByIdAction implements Action<UserData> {
  constructor(private payload: { email: string }) {}
  async execute(): Promise<UserData> {
    try {
      const user: UserData = await User.findUserByEmail(this.payload.email);
      return user;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
