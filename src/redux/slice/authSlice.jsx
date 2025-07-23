import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginDetail: [],
        loginIsLoading: false,
    },
    reducers: {
        loginReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.loginDetail = apiData;
            state.loginIsLoading = isLoading;
        },
        logout: (state) => {
            state.loginDetail = null;
        },
    },
})

export const { loginReducer,logout} = authSlice.actions;

export const authSelector = (state) => state.auth;

export const authReducer = authSlice.reducer;
