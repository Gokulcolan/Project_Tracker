import AdminRoutes from "./adminRoutes";
import AuthRoutes from "./authRoutes";
import ManagerRoutes from "./managerRoutes";
import UserRoutes from "./userRoutes";


const ROLES_ROUTES = {
  0: AuthRoutes,
  1: AdminRoutes,
  2: ManagerRoutes,
  3: UserRoutes,
}

export const getRoutes = (role) => {
  return ROLES_ROUTES[role];
};