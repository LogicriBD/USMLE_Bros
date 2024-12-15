import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeleteStoreType = {
    messageId: string;
    isDeleted: boolean;
}

const initState: DeleteStoreType = {
    messageId: "",
    isDeleted: false,
}

export const deleteSlice = createSlice({
    name: "delete",
    initialState: initState,
    reducers: {
        deleteMessage: (state: DeleteStoreType, action: PayloadAction<DeleteStoreType>) => {
            state.messageId = action.payload.messageId;
            state.isDeleted = action.payload.isDeleted;
        },
        resetDelete: (state: DeleteStoreType) => {
            state.messageId = "";
            state.isDeleted = false;
        },
    },
});

export const deleteActions = deleteSlice.actions;
export const deleteReducer = deleteSlice.reducer;