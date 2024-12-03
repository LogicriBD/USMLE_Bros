import { Category } from "@/database/repository/Category";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class StepCreate implements Action<void> {
  constructor() {}

  async execute(): Promise<void> {
    try {
      const count = (await Category.countAllSteps()) + 1;
      await Category.createStep(count.toString());
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
