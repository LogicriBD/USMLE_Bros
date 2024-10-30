import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AuthStorageType = {
  isLoggedIn: boolean;
  idToken?: string;
  refresh?: string;
};

const initState: AuthStorageType = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state: AuthStorageType, action: PayloadAction<AuthStorageType>) => {
      state = action.payload;
    },
    logout: (state: AuthStorageType) => {
      state.isLoggedIn = false;
      state.idToken = undefined;
      state.refresh = undefined;
    },
    setSessionStatus: (
      state: AuthStorageType,
      action: PayloadAction<boolean>
    ) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
