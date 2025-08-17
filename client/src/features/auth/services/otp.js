import axios from "axios"


export const otp_verify = async (userinfo, setmssg, otp, setlogin, navigate) => {

    try 
    {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/otp-verification`, {
            email: userinfo.email,
            password: userinfo.password,
            otp: otp,
            sentAt: new Date().toISOString()
        },
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (res.status!=200) {
            setmssg(res.message)
        }

        setlogin(true);
        navigate('/')
        


    }
    catch (err) {
        console.log(err)
    }
}


export const otp_resend = async(userinfo, setmssg) =>{

    try 
    {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/resend-otp`, {
            username: userinfo.username,
            email: userinfo.email
        },
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (res.status!=200) {
            setmssg(res.message)
        }      


    }
    catch (err) {
        console.log(err)
    }

}