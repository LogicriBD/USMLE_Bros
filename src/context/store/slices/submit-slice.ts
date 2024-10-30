import { createSlice } from "@reduxjs/toolkit";

export type SubmitStoreType = {
    toggle: boolean;
}

const initState: SubmitStoreType = {
    toggle: false
}

export const submitSlice = createSlice({
    name: "submit",
    initialState: initState,
    reducers: {
        toggleSubmit: (state: SubmitStoreType) => {
            state.toggle = !state.toggle;
        }
    }
});

export const submitActions = submitSlice.actions;
export const submitReducer = submitSlice.reducer;