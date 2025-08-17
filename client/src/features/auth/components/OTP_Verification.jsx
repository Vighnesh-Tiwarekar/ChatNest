import React, { useContext, useState } from 'react'
import '../../../shared/css/OTP_Verification.css'
import { userContext } from '../context/UserContext.js'
import {loginContext} from '../context/LoginContext.js'
import { otp_resend, otp_verify } from '../services/otp.js'
import { useNavigate } from 'react-router-dom'

const OTP_Verification = () => {

    const [otp, setotp] = useState('')
    const [mssg, setmssg] = useState('')
    const loginvalue = useContext(loginContext)
    const navigate = useNavigate()

    const uservalue = useContext(userContext)

    const handleOTP = async (e) => {

        e.preventDefault();
        otp_verify(uservalue.userinfo, setmssg, otp, loginvalue.setlogin, navigate);

    }

    const handleOTPResend = async(e) => {

        e.preventDefault();
        otp_resend(uservalue.userinfo, setmssg)
    }

    return (
        <div className='flex items-center h-[100vh]'>

            <main className='w-fit mx-auto py-[20px] signcard'>

                <section className='text-center'>

                    <div className='method font-extrabold'>
                        OTP Verification
                    </div>

                    <div className='text-[14px] mt-[10px]'>
                        An OTP has been sent to you email
                    </div>

                    <form className='sign' action="" onSubmit={(e) => { handleOTP(e) }}>

                        <div className='inputbox' id='otp'>
                            <input required className='text-[18px]' type="text" value={otp} placeholder=' '
                                onChange={(e) => {
                                    setotp(e.target.value)
                                }} />
                        </div>

                        <button className='w-fit mx-auto block btn txteffect glass mt-[10px]' type='button' onClick={(e)=>handleOTPResend(e)}>
                            Resend OTP
                        </button>

                        <button className='w-fit mx-auto block btn txteffect glass mt-[10px]' type='submit'>
                            Verify OTP
                        </button>

                        {mssg && <div>
                            {mssg}
                        </div>}

                    </form>

                </section>

            </main>

        </div>
    )
}

export default OTP_Verification