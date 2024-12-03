import { Category, StepData } from "@/database/repository/Category";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class StepFetchAll implements Action<StepData[]> {
  async execute(): Promise<StepData[]> {
    try {
      const steps: StepData[] = await Category.findAllSteps();
      return steps;
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
