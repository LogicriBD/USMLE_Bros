import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILoader {
  isLoading: boolean;
  authLoading: boolean;
  message?: string;
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
      state.message = "";
    },
    authTurnOn: (state: ILoader) => {
      state.authLoading = true;
    },
    authTurnOff: (state: ILoader) => {
      state.authLoading = false;
    },
    turnOnWithMessage: (state: ILoader, action:PayloadAction<string>) => {
      state.isLoading = true;
      state.message = action.payload;
    },
    setMessage: (state: ILoader, action:PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
});

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
