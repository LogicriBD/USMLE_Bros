import { Category, CategoryData } from "@/database/repository/Category";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class CategoryFetchAll implements Action<CategoryData[]> {
    async execute(): Promise<CategoryData[]> {
        try {
            const categories: CategoryData[] = await Category.findAllCategories();
            return categories;
        } catch (error: any) {
            console.error(error);
            throw new ApiError(400, error.message);
        }
    }
}