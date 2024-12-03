import { ModalName } from "@/utils/enums/ModalEnum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type ModalStoreType = {
  type: string;
  data: any;
  props?: string;
};

const initState: ModalStoreType = {
  type: "",
  data: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initState,
  reducers: {
    addModal: (
      state: ModalStoreType,
      action: PayloadAction<ModalStoreType>
    ) => {
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    addModalProps: (state: ModalStoreType, action: PayloadAction<string>) => {
      state.props = action.payload;
    },
    updateModalType: (
      state: ModalStoreType,
      action: PayloadAction<ModalName>
    ) => {
      state.type = action.payload;
    },

    updateModalData: (state: ModalStoreType, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    removeModal: (state: ModalStoreType) => {
      state.data = {};
      state.type = "";
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
