import ManagerHome from '../../pages/manager/Home'
import RootLayout from '../nav/rootLayout'
import ProjectList from '../../pages/manager/ProjectList'
import AddProjectForm from '../../componenets/manager/AddProjects'
import ProjectOverview from '../../componenets/manager/ProjectOverview'
import ManagerTeamMembers from '../../pages/manager/TeamMembers'

const ManagerRoutes = [
  {
    path: "/managerDashboard",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <ManagerHome />,
      },
      {
        path: "projects",
        element: <ProjectList />,
      },
        {
        path: "teamMembers",
        element: <ManagerTeamMembers />,
      },
      {
        path: "addNewProject",
        element: <AddProjectForm />,
      },
    
      {
        path: "viewProject",
        element: <ProjectOverview />,
      },
    ],
  }
]

export default ManagerRoutes