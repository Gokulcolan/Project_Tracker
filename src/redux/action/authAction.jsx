import { Apiservice } from "../api/apiService";
import { EditProfileReducer, forgotPassReducer, loginReducer, notificationReadUnreadReducer, notificationReducer } from "../slice/authSlice";

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

export function ForgotPasswordApi(payload) {
  return apiHelper(forgotPassReducer, "POST", "/api/auth/reset-password", payload);
}

export function EditProfileApi(payload) {
  return apiHelper(EditProfileReducer, "PUT", "/api/user/profile", payload);
}

export function NotificationApi(payload) {
  return apiHelper(notificationReducer, "GET", "/api/notifications", payload);
}

export function NotificationReadUnreadApi(notifId) {
  return apiHelper(notificationReadUnreadReducer, "PUT", `/api/notifications/${notifId}/read`);
}