import { createSlice } from "@reduxjs/toolkit";

const managerSlice = createSlice({
    name: "manager",
    initialState: {
        managerAddProjectDetail: [],
        managerAddProjectIsLoading: false,
        getManagerTeamMemberDetail: [],
        getManagerTeamMemberIsLoading: false,
        managerProjectListDetail: [],
        managerProjectListIsLoading: false,
        managerViewSingleProjectDetail: [],
        managerViewSingleProjectIsLoading: false,
        managerAddMilestoneDetail: [],
        managerAddMilestoneIsLoading: false,
        getMilestonesByProjectForManagerDetail: [],
        getMilestonesByProjectForManagerIsLoading: false,
        updateMilestonesByProjectForManagerDetail: [],
        updateMilestonesByProjectForManagerIsLoading: false,
        getMilestonesChartByProjectForManagerDetail: [],
        getMilestonesChartByProjectForManagerIsLoading: false,
    },
    reducers: {
        managerAddProjectReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.managerAddProjectDetail = apiData;
            state.managerAddProjectIsLoading = isLoading;
        },
        
        resetManagerAddProjectDetail: (state) => {
            state.managerAddProjectDetail = null;
            state.managerAddProjectIsLoading = false;
        },

        getManagerTeamMemberReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getManagerTeamMemberDetail = apiData;
            state.getManagerTeamMemberIsLoading = isLoading;
        },
        managerProjectListReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.managerProjectListDetail = apiData;
            state.managerProjectListIsLoading = isLoading;
        },
        managerViewSingleProjectReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.managerViewSingleProjectDetail = apiData;
            state.managerViewSingleProjectIsLoading = isLoading;
        },
        getMilestonesByProjectForManagerReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getMilestonesByProjectForManagerDetail = apiData;
            state.getMilestonesByProjectForManagerIsLoading = isLoading;
        },
        managerAddMilestoneReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.managerAddMilestoneDetail = apiData;
            state.managerAddMilestoneIsLoading = isLoading;
        },
        updateMilestonesByProjectForManagerReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.updateMilestonesByProjectForManagerDetail = apiData;
            state.updateMilestonesByProjectForManagerIsLoading = isLoading;
        },
        getMilestonesChartByProjectForManagerReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getMilestonesChartByProjectForManagerDetail = apiData;
            state.getMilestonesChartByProjectForManagerIsLoading = isLoading;
        },
    },
})

export const {resetManagerAddProjectDetail, managerAddProjectReducer, getManagerTeamMemberReducer, managerProjectListReducer, managerViewSingleProjectReducer, getMilestonesByProjectForManagerReducer, managerAddMilestoneReducer, updateMilestonesByProjectForManagerReducer, getMilestonesChartByProjectForManagerReducer } = managerSlice.actions;

export const managerSelector = (state) => state.manager;

export const managerReducer = managerSlice.reducer;
