import { encrypt } from '../utils/encryption.js';
import { validateotp, validatepass } from '../utils/validation.js';
import { generate_token } from '../utils/generatetoken.js';
import { sendmail } from '../utils/sendgmail.js';
import jwt from 'jsonwebtoken'
import { temp_otp, userlogin } from '../schema/loginschema.js';




export const sign_in = async (req, res) => {
    try {
        const details = req.body;
        const user = await userlogin.findOne({ email: details.email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const isValid = await validatepass(details, user.user_password);

        if (isValid) {
            const token = generate_token(user);
            return res.status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 1 * 24 * 60 * 60 * 1000
                })
                .json({ message: 'Login Successful' });
        }

        res.status(401).json({ message: 'Incorrect Password' });

    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const sign_up = async (req, res) => {
    try {
        const details = req.body;

        const existingUser = await userlogin.findOne({
            $or: [
                { email: details.email },
                { username: details.username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Email or Username already registered' });
        }

        const otp = await sendmail(details.email);
        const hashedpass = await encrypt(details.email, details.password);
        const tempUsercheck = await temp_otp.findOne({ email: details.email });

        if (tempUsercheck) {
            await temp_otp.updateOne(
                { email: details.email },
                {
                    $set: {
                        'otp': otp,
                        'user_password': hashedpass,
                        'createdAt': new Date()
                    }
                }
            );
            return res.status(202).json({ message: 'OTP Verification Restarted. New OTP sent.' });
        }

        await temp_otp.create({
            username: details.username,
            email: details.email,
            user_password: hashedpass,
            otp: otp,
            createdAt: new Date()
        });

        res.status(202).json({ message: 'OTP Verification Started. OTP sent to your email.' });

    } catch (err) {
        console.error('Error during sign-up:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const otp_verification = async (req, res) => {
    try {
        const details = req.body;
        const tempUser = await temp_otp.findOne({ email: details.email });

        if (!tempUser) {
            return res.status(404).json({ message: 'No pending OTP verification for this email. Please sign up again.' });
        }

        const status = await validateotp(details, tempUser);

        if (status.code !== 200) {
            return res.status(status.code).json({ message: status.message });
        }

        const hashedpass = tempUser.user_password;

        const newUser = await userlogin.create({
            username: tempUser.username, 
            email: details.email,
            user_password: hashedpass,
        });

        await temp_otp.deleteOne({ email: details.email });

        const token = generate_token(newUser);

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).json({ message: 'Registration Successful!' });

    } catch (err) {
        console.error('Error during OTP verification:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const resend_otp = async (req, res) => {
    try {
        const details = req.body;

        const tempUsercheck = await temp_otp.findOne({ email: details.email , username: details.username});

        if(!tempUsercheck) {
            return res.status(404).json({ message: 'No pending OTP verification found for this email. Please sign up first.' });
        }

        const otp = await sendmail(details.email);

        await temp_otp.updateOne(
            { email: details.email },
            {
                $set: {
                    otp: otp,
                    createdAt: new Date()
                }
            }
        );

        res.status(202).json({ message: 'OTP Resent successfully.' });
    } catch (err) {
        console.error('Error during OTP resend:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const validate = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ message: 'Token Verified' });
    } catch (err) {
        console.error('Error during token validation:', err);
        res.status(403).clearCookie('token').json({ message: 'Expired or Incorrect Token' });
    }
}


export const signout = async (req, res) => {
    try {
        res.status(200).clearCookie('token').json({ message: 'Sign Out successful' });
    } catch (err) {
        console.error('Error during sign-out:', err);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}
