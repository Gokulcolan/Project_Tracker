import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userAddProjectDetail: [],
        userAddProjectIsLoading: false,
        userProjectListDetail: [],
        userProjectListIsLoading: false,
        userViewSingleProjectDetail: [],
        userViewSingleProjectIsLoading: false,
        userAddMilestoneDetail: [],
        userAddMilestoneIsLoading: false,
        userAddTaskDetail: [],
        userAddTaskIsLoading: false,
        getMilestonesByProjectForUserDetail: [],
        getMilestonesByProjectForUserIsLoading: false,
        getTaskListByProjectForUserDetail: [],
        getTaskListByProjectForUserIsLoading: false,
        updateMilestonesByProjectForUserDetail: [],
        updateMilestonesByProjectForUserIsLoading: false,
        getMilestonesChartByProjectForUserDetail: [],
        getMilestonesChartByProjectForUserIsLoading: false,
        usermilestoneListByProjectForTaskUserDetail: false,
        usermilestoneListByProjectForTaskUserIsLoading: [],
        userProjectMemberListByProjectForTaskUserDetail: false,
        userProjectMemberListByProjectForTaskUserIsLoading: false
    },
    reducers: {
        userAddProjectReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userAddProjectDetail = apiData;
            state.userAddProjectIsLoading = isLoading;
        },
        userProjectListReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userProjectListDetail = apiData;
            state.userProjectListIsLoading = isLoading;
        },
        userViewSingleProjectReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userViewSingleProjectDetail = apiData;
            state.userViewSingleProjectIsLoading = isLoading;
        },

        userAddMilestoneReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userAddMilestoneDetail = apiData;
            state.userAddMilestoneIsLoading = isLoading;
        },

        getMilestonesByProjectForUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getMilestonesByProjectForUserDetail = apiData;
            state.getMilestonesByProjectForUserIsLoading = isLoading;
        },


        getTaskListByProjectForUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getTaskListByProjectForUserDetail = apiData;
            state.getTaskListByProjectForUserIsLoading = isLoading;
        },

        updateMilestonesByProjectForUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.updateMilestonesByProjectForUserDetail = apiData;
            state.updateMilestonesByProjectForUserIsLoading = isLoading;
        },

        getMilestonesChartByProjectForUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getMilestonesChartByProjectForUserDetail = apiData;
            state.getMilestonesChartByProjectForUserIsLoading = isLoading;
        },

        userAddTaskReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userAddTaskDetail = apiData;
            state.userAddTaskIsLoading = isLoading;
        },

        usermilestoneListByProjectForTaskReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.usermilestoneListByProjectForTaskUserDetail = apiData;
            state.usermilestoneListByProjectForTaskUserIsLoading = isLoading;
        },

        userProjectMemberListByProjectForTaskReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.userProjectMemberListByProjectForTaskUserDetail = apiData;
            state.userProjectMemberListByProjectForTaskUserIsLoading = isLoading;
        },
    },
})

export const { userAddProjectReducer, userProjectListReducer, userViewSingleProjectReducer, userAddMilestoneReducer, getMilestonesByProjectForUserReducer, updateMilestonesByProjectForUserReducer, getMilestonesChartByProjectForUserReducer, userAddTaskReducer, getTaskListByProjectForUserReducer, usermilestoneListByProjectForTaskReducer,userProjectMemberListByProjectForTaskReducer } = userSlice.actions;

export const userSelector = (state) => state.user;

export const userReducer = userSlice.reducer;
