import React from 'react'
import Login from '../../pages/auth/Login'
import { Outlet } from 'react-router-dom'
import EditProfile from '../../pages/auth/EditProfile'

const AuthRoutes = [
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: "/", // Corrected path
                element: <Login />,
            },
            // {
            //   path: "forgot-password", // Corrected path
            //   element: <ForgotPassword />,
            // },
            {
                path: "editProfile", // Corrected path
                element: <EditProfile />,
            },
        ],
    }
]

export default AuthRoutes