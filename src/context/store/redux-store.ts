import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modal-slice";
import { authReducer } from "./slices/auth-slice";
import { userReducer } from "./slices/user-slice";
import { loaderReducer } from "./slices/loader-slice";
import { categoryReducer } from "./slices/category-slice";
import { submitReducer } from "./slices/submit-slice";
import { blogReducer } from "./slices/blog-slice";
import { deleteReducer } from "./slices/delete-slice";

const appReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  user: userReducer,
  loader: loaderReducer,
  category: categoryReducer,
  submit: submitReducer,
  blog: blogReducer,
  deleteMessage: deleteReducer,
});

export const appStore = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppStore = ReturnType<typeof appReducer>;
export type AppDispatch = typeof appStore.dispatch;
