import React, { useContext, useState, useEffect } from 'react'
import { Login } from '../components/Login'
import OTP_Verification from '../components/OTP_Verification'
import {userContext} from '../context/UserContext.js'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../context/LoginContext.js'

const Sign = () => {

  const [isotp, setisotp] = useState(false)
  const [userinfo, setuserinfo] = useState({
    username: '',
    email: '',
    password: ''
  })
  
  const navigate = useNavigate();
  const loginvalue = useContext(loginContext)
  
    useEffect(() => {
    if (loginvalue.islogin) {
      navigate('/')
    }
  }, [loginvalue.islogin])

  return (
    <userContext.Provider value={{setisotp, userinfo, setuserinfo}}>

      {isotp ? <OTP_Verification></OTP_Verification> : <Login></Login>}

    </userContext.Provider>
  )
}

export default Sign