import { Apiservice } from "../api/apiService";
import { finalProjectCommentsReducer, getManagerTeamMemberListReducer, getManagerTeamMemberProjectListReducer, getManagerTeamMemberReducer, getMilestonesByProjectForManagerReducer, getMilestonesChartByProjectForManagerReducer, getTaskListByProjectForManagerReducer, managerAddMilestoneReducer, managerAddProjectReducer, managerAddUserReducer, managerProjectListReducer, managerViewSingleProjectReducer, projectStatusUpdateReducer, updateMilestonesByProjectForManagerReducer } from "../slice/managerSlice";

export function apiHelper(apiReducer, method, apiURL, data = "") {
    return async (dispatch) => {
        dispatch(apiReducer({ isLoading: true }));
        Apiservice(method, apiURL, data)
            .then((e) => {
                dispatch(apiReducer({ apiData: e?.data, isLoading: false, }));
            })
            .catch((e) => {
                dispatch(apiReducer({ isLoading: false }));
            });
    };
}

export function managerAddProjectApi(payload) {
    return apiHelper(managerAddProjectReducer, "POST", "/api/manager/project/create", payload);
}

export function getManagerTeamMemberApi(payload) {
    return apiHelper(getManagerTeamMemberReducer, "GET", "/api/manager/team-members", payload);
}

export function getAllProjectListApi(payload) {
    return apiHelper(managerProjectListReducer, "GET", "/api/manager/project/all", payload);
}

export function managerViewSingleProjectApi(payload) {
    return apiHelper(managerViewSingleProjectReducer, "GET", `/api/manager/project/${payload}`);
}

export function managerAddMilestoneApi(payload, projectRefId) {
    return apiHelper(managerAddMilestoneReducer, "POST", `/api/user/milestone/create/${projectRefId}`, payload);
}

export function getMilestoneByProjectForManagerApi(projectRefId) {
    return apiHelper(getMilestonesByProjectForManagerReducer, "GET", `/api/user/milestone/project/${projectRefId}`);
}

export function updateMilestonesByProjectFormanagerApi(projectRefId, payload) {
    return apiHelper(updateMilestonesByProjectForManagerReducer, "PUT", `/api/manager/project/${projectRefId}/milestones/edit`, payload);
}

export function MilestonesChartByProjectForManagerApi(projectRefId) {
    return apiHelper(getMilestonesChartByProjectForManagerReducer, "GET", `/api/manager/project/${projectRefId}/milestones/status`);
}

export function getTaskListByProjectForManagerApi(projectRefId) {
    return apiHelper(getTaskListByProjectForManagerReducer, "GET", `/api/user/milestones/${projectRefId}/task`);
}

export function getManagerTeamMemberListApi() {
    return apiHelper(getManagerTeamMemberListReducer, "GET", `/api/manager/team-members`);
}
export function getManagerTeamMemberProjectListApi(projectRefId) {
    return apiHelper(getManagerTeamMemberProjectListReducer, "GET", `/api/manager/team-members/${projectRefId}/project`);
}

export function managerAddUserApi(payload) {
    return apiHelper(managerAddUserReducer, "POST", "/api/manager/add-user", payload);
}

export function projectStatusUpdateManagerApi(payload, projectRefId) {
    return apiHelper(projectStatusUpdateReducer, "PUT", `/api/manager/project/${projectRefId}/update-status`, payload);
}

export function finalProjectCommentsApi(projectRefId) {
    return apiHelper(finalProjectCommentsReducer, "GET", `/api/project/${projectRefId}/status-history`);
}