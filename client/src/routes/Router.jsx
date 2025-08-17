import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import ChatPage from '../features/chat/pages/ChatPage'
import Sign from '../features/auth/pages/Sign'


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
