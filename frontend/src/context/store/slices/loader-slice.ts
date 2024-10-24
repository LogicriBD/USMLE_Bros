import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILoader {
    isLoading: boolean;
}

const initialState: ILoader = {
    isLoading: false,
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState:initialState,
    reducers: {
        turnOn: (state: ILoader) => {
            state.isLoading = true;
        },
        turnOff: (state:ILoader) => {
            state.isLoading = false;
        },
    }
});

export const loaderActions = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;