import { register } from "@/database/config/auth";
import { User } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserSignUpAction implements Action<UserCredential> {
  constructor(
    private payload: { email: string; password: string; name: string }
  ) {}
  async execute(): Promise<UserCredential> {
    try {
      await User.createGeneralUser(this.payload.email, this.payload.name);
      const userCredential: UserCredential = await register(
        this.payload.email,
        this.payload.password
      );
      return userCredential;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
