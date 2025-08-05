import express from 'express'
import { otp_verification, resend_otp, sign_in, sign_up, signout, validate } from '../controllers/logincontroller.js'

const loginrouter = express.Router()

loginrouter.post('/sign-up', sign_up)

loginrouter.post('/sign-in', sign_in)

loginrouter.get('/validate', validate)

loginrouter.post('/otp-verification', otp_verification)

loginrouter.post('/resend-otp', resend_otp)

loginrouter.get('/sign-out', signout)

export default loginrouter;