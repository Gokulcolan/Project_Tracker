import { Apiservice } from "../api/apiService";
import { getManagerTeamMemberReducer, getMilestonesByProjectForManagerReducer, getMilestonesChartByProjectForManagerReducer, managerAddMilestoneReducer, managerAddProjectReducer, managerProjectListReducer, managerViewSingleProjectReducer, updateMilestonesByProjectForManagerReducer } from "../slice/managerSlice";

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

export function managerAddMilestoneApi(payload,projectRefId) {
    return apiHelper(managerAddMilestoneReducer, "POST", `/api/user/milestone/create/${projectRefId}`,payload);
}

export function getMilestoneByProjectForManagerApi(projectRefId) {
    return apiHelper(getMilestonesByProjectForManagerReducer, "GET", `/api/user/milestone/project/${projectRefId}`);
}

export function updateMilestonesByProjectFormanagerApi(projectRefId,payload) {
    return apiHelper(updateMilestonesByProjectForManagerReducer, "PUT", `/api/manager/project/${projectRefId}/milestones/edit`,payload);
}

export function MilestonesChartByProjectForManagerApi(projectRefId) {
    return apiHelper(getMilestonesChartByProjectForManagerReducer, "GET", `/api/manager/project/${projectRefId}/milestones/status`);
}