import { CategoryData } from "@/database/repository/Category";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CategoryStoreType = {
  categories: CategoryData[];
  selectedCategory: CategoryData | null;
};

export const initState: CategoryStoreType = {
  categories: [],
  selectedCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    setCategories: (
      state: CategoryStoreType,
      action: PayloadAction<CategoryData[]>
    ) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (
      state: CategoryStoreType,
      action: PayloadAction<CategoryData | null>
    ) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
