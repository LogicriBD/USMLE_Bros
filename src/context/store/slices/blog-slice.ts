import { BlogType } from "@/utils/enums/Blog";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BlogStoreType = {
    category: BlogType;
}

export const initState: BlogStoreType = {
    category: BlogType.BLOG,
}

export const BlogSlice = createSlice({
    name:"blog",
    initialState: initState,
    reducers: {
        setCategory: (state: BlogStoreType, action: PayloadAction<BlogType>) => {
            state.category = action.payload;
        }   
    },
});

export const blogActions = BlogSlice.actions;
export const blogReducer = BlogSlice.reducer;