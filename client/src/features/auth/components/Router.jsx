import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import ChatPage from './ChatPage'
import { Login } from './Login'
import OTP_Verification from './OTP_Verification'
import Sign from './Sign'


export const router =  createBrowserRouter([
    {
        path: '/login',
        element: <Sign></Sign>
    },
    {
    element: <ProtectedRoutes></ProtectedRoutes>,
    children: [
        {
            path: '/',
            element: <ChatPage></ChatPage>
        }
    ]
    }
])
