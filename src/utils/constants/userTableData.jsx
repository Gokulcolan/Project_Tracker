export const userProjectListTableHead = [
    {
        label: "Project Name", id: "project_name"
    },
    {
        label: "Plant", id: "plant"
    },
    {
        label: "Start Date", id: "start_date"
    },
    {
        label: "End Date", id: "enddate"
    },
    {
        label: "Project Members", id: "teammembers.name"
    },
    {
        label: "Project Status", id: "status"
    },
    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [
            { key: "view", label: "View", color: "primary" },
            // { key: "edit", label: "Edit", color: "secondary" },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },
   
]

export const userProjectMilestoneSettingTableHead = [
    {
        label: "Project Name", id: "project_name"
    },
    {
        label: "Plant", id: "plant"
    },

    {
        label: "Start Date", id: "start_date"
    },
    {
        label: "End Date", id: "enddate"
    },

    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [
            { key: "view", label: "Set Milestone", color: "primary", },
            { key: "edit", label: "View Milestone", color: "secondary" },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },
]

export const userViewMilestoneProjectTableHead = [
    {
        label: "Milestone", id: "milestone_name"
    },
    {
        label: "Start Date", id: "startdate"
    },
    {
        label: "End Date", id: "enddate"
    },
    {
        label: "Remarks", id: "remarks"
    },
    {
        label: "Status", id: "status"
    },
    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [

            {
                key: "view",
                label: "Set Milestone",
                color: "primary",
                getDisabled: (row) => row.status != null, // if your CommonTable supports dynamic disabled
            },
            { key: "edit", label: "Update Milestone", color: "secondary", getDisabled: (row) => row.status === null },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },
]

export const userTaskListTableHead = [
    {
        label: "Milestone Name", id: "milestone_name"
    },
    {
        label: "Task Name", id: "tasks.task_name",
    },
    {
        label: "Task Worked Date", id: "tasks.date"
    },
    {
        label: "Task Description", id: "tasks.description"
    },
]

export const managerTaskListTableHead = [

    {
        label: "Milestone Name", id: "milestone_name"
    },
    {
        label: "Task Name", id: "tasks.task_name"
    },
    {
        label: "Task Worked Date", id: "tasks.date"
    },
    {
        label: "Task Worked Member", id: "tasks.assigned_user_name"
    },
    {
        label: "Task Description", id: "tasks.description"
    },
]

export const managerViewMilestoneProjectTableHead = [
    {
        label: "Milestone", id: "name"
    },
    {
        label: "Start Date", id: "startdate"
    },
    {
        label: "End Date", id: "enddate"
    },
    {
        label: "Remarks", id: "remarks"
    },
    {
        label: "Status", id: "status"
    },
    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [
            { key: "view", label: "View", color: "primary" },
            // { key: "edit", label: "Edit", color: "secondary" },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },

]


export const managerProjectListTableHead = [
    {
        label: "Project Name", id: "project_name"
    },

    {
        label: "Product", id: "product"
    },
    {
        label: "Category", id: "category"
    },

    {
        label: "Project Members", id: "teammembers.name"
    },
    {
        label: "Project Status", id: "project_status"
    },
    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [
            { key: "view", label: "View", color: "primary" },
            // { key: "edit", label: "Edit", color: "secondary" },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },
   
]

export const managerTeamMemberProjectListTableHead = [
    {
        label: "Project Name", id: "project_name"
    },
    {
        label: "Plant", id: "plant"
    },
    {
        label: "Start Date", id: "start_date"
    },
    {
        label: "End Date", id: "enddate"
    },
    {
        label: "Status", id: "status"
    },
    {
        id: "actions",
        label: "Actions",
        type: "actions",
        actions: [
            { key: "view", label: "View", color: "primary" },
            // { key: "edit", label: "Edit", color: "secondary" },
            // { key: "delete", label: "Delete", color: "error" },
        ],
    },
]