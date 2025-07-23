import { Apiservice } from "../api/apiService";
import { loginReducer } from "../slice/authSlice";

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


export function LoginApi(payload) {
  return apiHelper(loginReducer, "POST", "/api/auth/user-login", payload);
}