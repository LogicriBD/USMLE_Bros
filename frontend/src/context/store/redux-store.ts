import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modal-slice";
import { authReducer } from "./slices/auth-slice";
import { userReducer } from "./slices/user-slice";
import { loaderReducer } from "./slices/loader-slice";
import { categoryReducer } from "./slices/category-slice";

const appReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  user: userReducer,
  loader: loaderReducer,
  category: categoryReducer,
});

export const appStore = configureStore({
  reducer: appReducer,
});

export type AppStore = ReturnType<typeof appReducer>;
export type AppDispatch = typeof appStore.dispatch;
