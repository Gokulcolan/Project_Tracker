import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { userReducer } from "./slice/userSlice";
import { adminReducer } from "./slice/adminSlice";
import { managerReducer } from "./slice/managerSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  manager: managerReducer,
  admin: adminReducer,
});

const Store = configureStore({ reducer: rootReducer });
export default Store
