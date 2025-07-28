import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginDetail: [],
        loginIsLoading: false,
        notificationDetail: [],
        notificationIsLoading: false,
        notificationReadUnreadDetail: [],
        notificationReadUnreadIsLoading: false,
    },
    reducers: {
        loginReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.loginDetail = apiData;
            state.loginIsLoading = isLoading;
        },
        notificationReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.notificationDetail = apiData;
            state.notificationIsLoading = isLoading;
        },
        notificationReadUnreadReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.notificationReadUnreadDetail = apiData;
            state.notificationReadUnreadIsLoading = isLoading;
        },
        logout: (state) => {
            state.loginDetail = null;
        },
    },
})

export const { loginReducer, logout, notificationReducer, notificationReadUnreadReducer } = authSlice.actions;

export const authSelector = (state) => state.auth;

export const authReducer = authSlice.reducer;
