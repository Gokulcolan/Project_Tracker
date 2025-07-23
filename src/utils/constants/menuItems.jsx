import ContactPageIcon from "@mui/icons-material/ContactPage";

export const AdminmenuItems = [
    {
        isNested: [
            {
                path: "/adminDashboard/home",
                name: "Admin Home",
                icon: <ContactPageIcon />,
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
                icon: <ContactPageIcon />,
            },
            {
                path: "/managerDashboard/projects",
                name: "Project List",
                icon: <ContactPageIcon />,
            },

            {
                path: "/managerDashboard/teamMembers",
                name: "Team Members",
                icon: <ContactPageIcon />,
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
                icon: <ContactPageIcon />,
            },
            {
                path: "/userDashboard/projects",
                name: "Project List",
                icon: <ContactPageIcon />,
            },
            // {
            //     path: "/userDashboard/mileStones",
            //     name: "Milestones",
            //     icon: <ContactPageIcon />,
            // },
        ],
    },
];