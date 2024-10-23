import { login } from "@/database/config/auth";
import { Action } from "@/types/Action";
import { UserCredential } from "firebase/auth";
import { ApiError } from "next/dist/server/api-utils";

export class UserLoginAction implements Action<UserCredential> {
  constructor(private payload: { email: string; password: string }) {}
  async execute(): Promise<UserCredential> {
    try {
      const userCredential: UserCredential = await login(
        this.payload.email,
        this.payload.password
      );
      return userCredential;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}
