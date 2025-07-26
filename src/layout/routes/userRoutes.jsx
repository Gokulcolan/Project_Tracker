import UserHome from '../../pages/user/Home'
import RootLayout from '../nav/rootLayout'
import AddNewProject from '../../componenets/manager/AddProjects'
import ProjectList from '../../pages/user/ProjectList'
import ViewMilestone from '../../componenets/user/UpdateMilestone'
import ProjectDashboard from '../../componenets/user/ProjectDashboard'
import AddNewTask from '../../componenets/user/AddNewTask'
import ProjectApproval from '../../componenets/user/ProjectApproval'

const UserRoutes = [
  {
    path: "/userDashboard",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <UserHome />,
      },
      {
        path: "projects",
        element: <ProjectList />,
      },
      {
        path: "addNewProject",
        element: <AddNewProject />,
      },
      {
        path: "viewProject",
        element: <ProjectDashboard />,
      },
      {
        path: "viewMilestones",
        element: <ViewMilestone />,
      },
      {
        path: "addNewTask",
        element: <AddNewTask />,
      },
      {
        path: "projectApproval",
        element: <ProjectApproval />,
      },
    ],
  }
]

export default UserRoutes