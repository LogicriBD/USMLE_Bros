import { Category, CategoryData } from "@/database/repository/Category";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { ApiError } from "next/dist/server/api-utils";

export class CategoryFetchBySteps implements Action<CategoryData[]> {
  constructor(private stepId: string) {}

  async execute(): Promise<CategoryData[]> {
    try {
      const categories: CategoryData[] = await Category.findByStepId(
        this.stepId
      );
      return categories;
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
