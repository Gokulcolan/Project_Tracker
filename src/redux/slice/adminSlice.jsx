import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminAddUserDetail: [],
        adminAddUserIsLoading: false,
    },
    reducers: {
        adminAddUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.adminAddUserDetail = apiData;
            state.adminAddUserIsLoading = isLoading;
        },

    },
})

export const { adminAddUserReducer } = adminSlice.actions;

export const adminSelector = (state) => state.admin;

export const adminReducer = adminSlice.reducer;
