import AdminRoutes from "./adminRoutes";
import AuthRoutes from "./authRoutes";
import CommonRoutes from "./commonRoutes";
import ManagerRoutes from "./managerRoutes";
import UserRoutes from "./userRoutes";


// const ROLES_ROUTES = {
//   0: AuthRoutes,
//   1: AdminRoutes,
//   2: ManagerRoutes,
//   3: UserRoutes,
// }

const ROLES_ROUTES = {
  0: [...AuthRoutes, ...CommonRoutes],
  1: [...AdminRoutes, ...CommonRoutes],
  2: [...ManagerRoutes, ...CommonRoutes],
  3: [...UserRoutes, ...CommonRoutes],
};

export const getRoutes = (role) => {
  return ROLES_ROUTES[role];
};