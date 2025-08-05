import React, { useContext, useEffect, useState } from 'react'
import '../css/Login.css'
import { userContext } from '../context/UserContext'
import { sign_in, sign_up } from '../functions/sign'
import { loginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const Signin = ({uservalue}) => {

  const [mssg, setmssg] = useState('')
  const loginvalue = useContext(loginContext)
  const navigate = useNavigate();

  const handleSignIn = async(e) => {

    e.preventDefault();
    sign_in(uservalue.userinfo,setmssg, loginvalue.setlogin,navigate);

  }

  return (
    <>
      <form className='sign' action="" onSubmit={(e)=>{handleSignIn(e)}}>

        <div className='inputbox' id='email'>
          <input className='signinput' type="email" placeholder=' ' value={uservalue.userinfo.email}
            onChange={(e) => {
              uservalue.setuserinfo(prevUser => ({
                ...prevUser,
                email: e.target.value
              }));
            }} />
        </div>

        <div className='inputbox' id='pass'>
          <input className='signinput' type="password" placeholder=' ' value={uservalue.userinfo.password}
            onChange={(e) => {
              uservalue.setuserinfo(prevUser => ({
                ...prevUser,
                password: e.target.value
              }));
            }} />
        </div>

        <button className='w-fit mx-auto block btn txteffect glass mt-[10px]' type='submit'>
          Sign In
        </button>

        {mssg && <div>
          {mssg}
        </div>}

      </form>
    </>
  )
}

const Signup = ({uservalue}) => {

  const [mssg, setmssg] = useState('')

  const handleSignUp = async(e) => {

    e.preventDefault();
    sign_up(uservalue.userinfo,setmssg, uservalue.setisotp);

  }

  return (
    <>
      <form className='sign' action="" onSubmit={handleSignUp}>

        <div className='inputbox' id='username'>
          <input required className='signinput ' type="text" placeholder=' ' value={uservalue.userinfo.username}
            onChange={(e) => {
              uservalue.setuserinfo(prevUser => ({
                ...prevUser,
                username: e.target.value
              }));
            }} />
        </div>

        <div className='inputbox' id='email' >
          <input required className='signinput ' type="email" placeholder=' ' value={uservalue.userinfo.email}
            onChange={(e) => {
              uservalue.setuserinfo(prevUser => ({
                ...prevUser,
                email: e.target.value
              }));
            }} />
        </div>

        <div className='inputbox' id='pass'>
          <input required className='signinput ' type="text" placeholder=' ' value={uservalue.userinfo.password}
            onChange={(e) => {
              uservalue.setuserinfo(prevUser => ({
                ...prevUser,
                password: e.target.value
              }));
            }} />
        </div>

        <button className='w-fit mx-auto block btn txteffect glass mt-[10px]' type='submit'>
          Sign Up
        </button>

        {mssg && <div>
          {mssg}
        </div>}

      </form>
    </>
  )
}

export const Login = () => {

  const [signmethod, setsignmethod] = useState('in')

  const uservalue = useContext(userContext)

  useEffect(() => {

    const checkToken = async () => {

      const status = validate();

      if (status == 200) {
        loginvalue.setlogin(true)
      }
      else {
        loginvalue.setlogin(false)
      }

    }


  }, [])

  return (
    <div className='flex items-center h-[100vh]'>

      <main className='w-fit mx-auto signcard'>

        <section className='text-center font-extrabold border-b-[1px] flex justify-around method'>

          <div className='w-full p-[15px] txteffect glass' onClick={() => setsignmethod('in')}>
            Sign In
          </div>

          <div className='border-x-[1px]'></div>

          <div className='w-full p-[15px] txteffect glass' onClick={() => setsignmethod('up')}>
            Sign Up
          </div>

        </section>

        <section>

          {signmethod == 'in' ? <Signin uservalue={uservalue} ></Signin> : <Signup uservalue={uservalue} ></Signup>}

        </section>

      </main>

    </div>
  )
}
