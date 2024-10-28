import { Category } from "@/database/repository/Category";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class CategoryCreate implements Action<void> {
  constructor(private payload: { name: string }) {}

  async execute(): Promise<void> {
    try {
      await Category.createCategory(this.payload.name);
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
