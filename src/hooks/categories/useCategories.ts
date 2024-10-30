/* eslint-disable react-hooks/exhaustive-deps */
import { CategoryFetchAll } from "@/actions/category/CategoryFetchAll";
import { CategoryData } from "@/database/repository/Category";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { categoryActions } from "@/src/context/store/slices/category-slice";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";

/**
 *
 * @param dependency Infers Rendering Logic, if empty the categories are only fetched when the component is mounted, otherwise it is fetched every single time the contents of the dependency array changes
 * @param unmountCallback A callback function that is called when the component is unmounted
 * @returns categories, selectedCategory and selectCategory, where categories refer to all the categories, selectedCategory refers to the category that is currently selected and selectedCategory is the function that selects a category
 * @mirzaazwad
 */
export const useCategories = (
  dependency: any[] = [],
  unmountCallback?: () => void
) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const categoryAction = await new CategoryFetchAll();
      const categories = await categoryAction.execute();
      setCategories(categories);
      if (categories.length > 0) {
        dispatch(categoryActions.setCategories(categories));
        if (!selectedCategory) {
          dispatch(categoryActions.setSelectedCategory(categories[0]));
        }
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    return () => {
      if (unmountCallback) {
        unmountCallback();
      }
    };
  }, [...dependency]);

  /**
   *
   * @param category The category that is to be select selected
   * @returns void
   */
  const selectCategory = (category: CategoryData) => {
    dispatch(categoryActions.setSelectedCategory(category));
  };

  return { categories, selectedCategory, selectCategory, loading };
};
