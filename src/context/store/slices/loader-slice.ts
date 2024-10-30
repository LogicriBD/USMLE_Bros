import { createSlice } from "@reduxjs/toolkit";

export interface ILoader {
  isLoading: boolean;
  authLoading: boolean;
}

const initialState: ILoader = {
  isLoading: false,
  authLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    turnOn: (state: ILoader) => {
      state.isLoading = true;
    },
    turnOff: (state: ILoader) => {
      state.isLoading = false;
    },
    authTurnOn: (state: ILoader) => {
      state.authLoading = true;
    },
    authTurnOff: (state: ILoader) => {
      state.authLoading = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
