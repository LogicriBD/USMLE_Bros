import { UserData } from "@/database/repository/User";
import { Roles } from "@/utils/enums/Roles";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initState: UserData = {
  id: "",
  email: "",
  name: "",
  role: Roles.User,
  isBanned: false,
  banExpiry: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setRole: (state: UserData, action: PayloadAction<Roles>) => {
      state.role = action.payload;
    },
    setEmail: (state: UserData, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setData: (state: UserData, action: PayloadAction<UserData>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isBanned = action.payload.isBanned;
      if(action.payload.banExpiry){
        state.banExpiry = action.payload.banExpiry;
      }
    },
    clearData: (state: UserData) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.role = Roles.User;
      state.isBanned = false;
      state.banExpiry = null;
    },
  },
});
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
