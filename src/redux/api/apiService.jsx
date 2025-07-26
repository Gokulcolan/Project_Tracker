import { ADMIN_BASE_URL } from "./configURL";
import { showToast } from "../../componenets/common/Toast/toastServices";
import axios from "axios";
import { handleSesssionStorage } from "../../utils/helperFunction";

// export const Apiservice = async (method, url, body, params) => {
//   const accessToken =
//     typeof window !== "undefined" ? handleSesssionStorage("get", "token") : "";
//   console.log(accessToken, "accessToken")
//   if (window.navigator.onLine || !window.navigator.onLine) {
//     try {
//       const response = await axios({
//         method: method,
//         baseURL: ADMIN_BASE_URL,
//         url: url,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         data: body,
//         params: params || null,
//       });

//       console.log(response, "response")
//       if (response.status === 200 || response.status === 201) {
//         return {
//           status: "success",
//           data: response.data,
//         };
//       } else {
//         return {
//           status: "error",
//           message: response.status && response.statusText,
//         };
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//       if (error.message === "Network Error") {
//         // showToast("Network Error", "error");
//         return Promise.reject();
//       } else if (error.response?.status === 400) {
//         // showToast("Please Check the Credentials", "error");
//         return Promise.reject();
//       } else if (
//         error.response?.status === 401 ||
//         error.response?.status === 403
//       ) {
//         // Handle unauthorized or forbidden access
//         // For example, you can show a message or redirect to login page
//         showToast("Unauthorized or Forbidden Access", "error");
//       } else {
//         // showToast("An unexpected error occurred", "error");
//         return Promise.reject(error);
//       }
//     }
//   } else {
//     // showToast("You are offline. Please check your internet connection.", "error");
//   }
// };

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

      // console.log("✅ Success Response:", response);

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

