import { Apiservice } from "../api/apiService";
import { adminAddUserReducer } from "../slice/adminSlice";

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


export function AdminAddUserApi(payload) {
    return apiHelper(adminAddUserReducer, "POST", "/api/admin/add-user", payload);
}