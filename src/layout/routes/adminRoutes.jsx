import React from 'react'
import RootLayout from '../nav/rootLayout'
import AdminHome from '../../pages/admin/Home'

const AdminRoutes = [
    {
        path: "/adminDashboard",
        element: <RootLayout />,
        children: [
            {
                path: "home",
                element: <AdminHome />,
            },

        ],
    }
]

export default AdminRoutes