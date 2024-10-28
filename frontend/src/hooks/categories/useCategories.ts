/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryFetchAll } from "@/actions/category/CategoryFetchAll";
import { CategoryData } from "@/database/repository/Category";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { categoryActions } from "@/src/context/store/slices/category-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";

/**
 *
 * @param dependency Infers Rendering Logic, if empty the categories are only fetched when the component is mounted, otherwise it is fetched every single time the contents of the dependency array changes
 * @returns categories and selectedCategory, where categories refer to all the categories and selectedCategory refers to the category that is currently selected
 */
export const useCategories = (dependency: any[] = []) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const fetchCategories = async () => {
    try {
      dispatch(loaderActions.turnOn());
      const categoryAction = await new CategoryFetchAll();
      const categories = await categoryAction.execute();
      setCategories(categories);
      if (categories.length > 0) {
        dispatch(categoryActions.setCategories(categories));
        if (selectedCategory === null) {
          dispatch(categoryActions.setSelectedCategory(categories[0]));
        }
      }
    } catch (error) {
      logger.error(error);
    } finally {
      dispatch(loaderActions.turnOff());
    }
  };

  useEffect(() => {
    fetchCategories();
    return () => {
      dispatch(categoryActions.setSelectedCategory(null));
    };
  }, [...dependency]);

  return { categories, selectedCategory };
};
