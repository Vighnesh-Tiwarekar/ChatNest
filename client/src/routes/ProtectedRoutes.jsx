import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { loginContext } from '../features/auth/context/LoginContext'

const ProtectedRoutes = () => {

    const loginvalue = useContext(loginContext)

    if (loginvalue.islogin) {

        return (
            <>
                <Outlet></Outlet>
            </>
        )
    }

    return <Navigate to='/login'></Navigate>

}

export default ProtectedRoutes