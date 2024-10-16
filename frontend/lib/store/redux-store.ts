import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { modalReducer, modalSlice } from "./slices/modal-slice";

const appReducer = combineReducers({
    modal: modalReducer,
});

export const appStore = () => {
    return configureStore({
      reducer: {
        modal: modalSlice.reducer,
      },
    });
  };

export type AppStore = ReturnType<typeof appStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];