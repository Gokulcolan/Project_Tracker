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
        getTaskListByProjectForManagerDetail: [],
        getTaskListByProjectForManagerIsLoading: false,
        getManagerTeamMemberListDetail: [],
        getManagerTeamMemberListIsLoading: false,
        getManagerTeamMemberProjectListDetail: [],
        getManagerTeamMemberProjectListIsLoading: false,
        managerAddUserDetail: [],
        managerAddUserIsLoading: false,
        projectStatusUpdateDetail: [],
        projectStatusUpdateIsLoading: false,
        finalProjectCommentsDetail: [],
        finalProjectCommentsIsLoading: false
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

        getTaskListByProjectForManagerReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getTaskListByProjectForManagerDetail = apiData;
            state.getTaskListByProjectForManagerIsLoading = isLoading;
        },
        getManagerTeamMemberListReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getManagerTeamMemberListDetail = apiData;
            state.getManagerTeamMemberListIsLoading = isLoading;
        },
        getManagerTeamMemberProjectListReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.getManagerTeamMemberProjectListDetail = apiData;
            state.getManagerTeamMemberProjectListIsLoading = isLoading;
        },
        managerAddUserReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.managerAddUserDetail = apiData;
            state.managerAddUserIsLoading = isLoading;
        },

        projectStatusUpdateReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.projectStatusUpdateDetail = apiData;
            state.projectStatusUpdateIsLoading = isLoading;
        },
        finalProjectCommentsReducer: (state, { payload }) => {
            const { apiData, isLoading } = payload;
            state.finalProjectCommentsDetail = apiData;
            state.finalProjectCommentsIsLoading = isLoading;
        },
    },
})

export const {
    resetManagerAddProjectDetail,
    managerAddProjectReducer,
    getManagerTeamMemberReducer,
    managerProjectListReducer,
    managerViewSingleProjectReducer,
    getMilestonesByProjectForManagerReducer,
    managerAddMilestoneReducer,
    updateMilestonesByProjectForManagerReducer,
    getMilestonesChartByProjectForManagerReducer,
    getTaskListByProjectForManagerReducer,
    getManagerTeamMemberListReducer,
    managerAddUserReducer,
    getManagerTeamMemberProjectListReducer,
    projectStatusUpdateReducer,
    finalProjectCommentsReducer

} = managerSlice.actions;

export const managerSelector = (state) => state.manager;

export const managerReducer = managerSlice.reducer;
