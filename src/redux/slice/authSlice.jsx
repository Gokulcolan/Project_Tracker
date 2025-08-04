import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginDetail: [],
        loginIsLoading: false,
        forgotPassDetail: [],
        forgotPassIsLoading: false,
        EditProfileDetail: [],
        EditProfileIsLoading: false,
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
        forgotPassReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.forgotPassDetail = apiData;
            state.forgotPassIsLoading = isLoading;
        },
        EditProfileReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.EditProfileDetail = apiData;
            state.EditProfileIsLoading = isLoading;
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

export const { loginReducer, forgotPassReducer,EditProfileReducer, logout, notificationReducer, notificationReadUnreadReducer } = authSlice.actions;

export const authSelector = (state) => state.auth;

export const authReducer = authSlice.reducer;
