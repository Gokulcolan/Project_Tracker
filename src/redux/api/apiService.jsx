import { ADMIN_BASE_URL } from "./configURL";
import { showToast } from "../../componenets/common/Toast/toastServices";
import axios from "axios";
import { handleSesssionStorage } from "../../utils/helperFunction";


export const Apiservice = async (method, url, body, params) => {
  const accessToken =
    typeof window !== "undefined" ? handleSesssionStorage("get", "token") : "";

  if (window.navigator.onLine) {
    try {
      const response = await axios({
        method,
        baseURL: ADMIN_BASE_URL,
        url,
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          "Content-Type": "application/json",
        },
        data: body,
        params: params || null,
      });


      const message = response.data?.message || "";
      if (message) {
        showToast(message, "success");
      }

      return {
        status: "success",
        data: response.data,
      };
    } catch (error) {
      console.log("❌ Error caught:", error);

      // ✅ Safely extract meaningful message
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message || error?.message || "Unexpected error occurred";

      console.log(message, "message")

      // ✅ Show error toast always
      showToast(message, "error");

      // Optional: You can handle specific statuses here too
      // if (status === 401) {
      //   // redirect or handle unauthorized logic
      // }

      return Promise.reject(error); // bubble up error if needed
    }
  } else {
    const offlineMsg = "You are offline. Check your internet connection.";
    showToast(offlineMsg, "error");
    return Promise.reject({ message: offlineMsg });
  }
};

