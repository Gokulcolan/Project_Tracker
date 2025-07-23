import { Apiservice } from "../api/apiService";
import { getMilestonesByProjectForUserReducer, getMilestonesChartByProjectForUserReducer, getTaskListByProjectForUserReducer, updateMilestonesByProjectForUserReducer, userAddMilestoneReducer, userAddProjectReducer, userAddTaskReducer, usermilestoneListByProjectForTaskReducer, userProjectListReducer, userProjectMemberListByProjectForTaskReducer, userTeamMemberListByProjectForTaskReducer, userViewSingleProjectReducer } from "../slice/userSlice";

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

export function userAddProjectApi(payload) {
    return apiHelper(userAddProjectReducer, "POST", "/api/user/projects", payload);
}

export function userProjectListApi(payload) {
    return apiHelper(userProjectListReducer, "GET", "/api/user/project/assigned", payload);
}

export function userViewSingleProjectApi(payload) {
    return apiHelper(userViewSingleProjectReducer, "GET", `/api/user/project/assigned/${payload}`);
}

export function userAddMilestoneApi(payload, milestoneRefId) {
    return apiHelper(userAddMilestoneReducer, "PUT", `/api/user/milestone/update/${milestoneRefId}`, payload);
}

export function getMilestonesByProjectForUserApi(projectRefId) {
    return apiHelper(getMilestonesByProjectForUserReducer, "GET", `/api/user/milestone/project/${projectRefId}`);
}

export function updateMilestonesByProjectForUserApi(milestoneRefId, payload) {
    return apiHelper(updateMilestonesByProjectForUserReducer, "PUT", `/api/user/milestone/update/${milestoneRefId}`, payload);
}

// export function updateMilestonesByProjectForUserApi(projectRefId,payload) {
//     return apiHelper(updateMilestonesByProjectForUserReducer, "PUT", `/api/user/projects/${projectRefId}/milestones/edit`,payload);
// }

export function MilestonesChartByProjectForUserApi(projectRefId) {
    return apiHelper(getMilestonesChartByProjectForUserReducer, "GET", `/api/user/projects/${projectRefId}/milestones/status`);
}

export function userAddTaskApi(payload, projectRefId) {
    return apiHelper(userAddTaskReducer, "POST", `/api/user/milestones/${projectRefId}/task`, payload);
}

export function userMilestoneListByProjectForTaskApi(projectRefId) {
    return apiHelper(usermilestoneListByProjectForTaskReducer, "GET", `/api/user/project/${projectRefId}/milestones`);
}

export function userProjectMembersListForTaskApi(projectRefId) {
    return apiHelper(userProjectMemberListByProjectForTaskReducer, "GET", `/api/user/project/${projectRefId}/team-members`);
}

export function getTaskListByProjectForUserApi(projectRefId) {
    return apiHelper(getTaskListByProjectForUserReducer, "GET", `/api/user/milestones/${projectRefId}/task`);
}

