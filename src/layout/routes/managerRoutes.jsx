import ManagerHome from '../../pages/manager/Home'
import RootLayout from '../nav/rootLayout'
import ProjectList from '../../pages/manager/ProjectList'
import AddProjectForm from '../../componenets/manager/AddProjects'
import ManagerTeamMembers from '../../pages/manager/TeamMembers'
import ProjectDashboard from '../../componenets/manager/ProjectDashboard'
import ProjectTaskList from '../../componenets/manager/ProjectTaskList'
import TeamMemberProjectList from '../../componenets/manager/TeamProjectList'
import ProjectApproval from '../../componenets/manager/ProjectApproval'

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
        element: <ProjectDashboard />,
      },

      {
        path: "viewProjectTaskList",
        element: <ProjectTaskList />,
      },

      {
        path: "viewTeamProjectList",
        element: <TeamMemberProjectList />,
      },
      {
        path: "projectApproval",
        element: <ProjectApproval />,
      },
    ],
  }
]

export default ManagerRoutes