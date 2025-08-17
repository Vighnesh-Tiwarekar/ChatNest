import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoutes from '../../../routes/ProtectedRoutes'
import ChatPage from './ChatPage'
import Sign from '../pages/Sign'


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
