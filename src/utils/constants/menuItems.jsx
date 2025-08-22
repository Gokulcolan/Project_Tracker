import ContactPageIcon from "@mui/icons-material/ContactPage";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export const AdminmenuItems = [
    {
        isNested: [
            {
                path: "/adminDashboard/home",
                name: "Admin Home",
                icon: <Diversity3Icon />,
            },

        ],
    },
];

export const ManagermenuItems = [
    {
        isNested: [
            {
                path: "/managerDashboard/home",
                name: "Manager Home",
                icon: <DashboardIcon />,
            },
            {
                path: "/managerDashboard/projects",
                name: "Project List",
                icon: <AccountTreeIcon />,
            },

            {
                path: "/managerDashboard/teamMembers",
                name: "Team Members",
                icon: <Diversity3Icon />,
            },

        ],
    },
];

export const UsermenuItems = [
    {
        isNested: [
            {
                path: "/userDashboard/home",
                name: "User Dashboard",
                icon: <DashboardIcon />,
            },
            {
                path: "/userDashboard/projects",
                name: "Project List",
                icon: <AccountTreeIcon />,
            },
        
        ],
    },
];