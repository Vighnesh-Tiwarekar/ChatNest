import axios from "axios"


export const sign_in = async (userinfo, setmssg, setlogin, navigate) => {

    try 
    {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/sign-in`, {
            email: userinfo.email,
            password: userinfo.password
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

export const sign_up = async (userinfo, setmssg, setisotp) => {

    try 
    {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login/sign-up`, {
            username: userinfo.username,
            email: userinfo.email,
            password: userinfo.password
        },
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (res.status!=202) {
            setmssg(res.message)
            return;
        }

        setisotp(true)       


    }
    catch (err) {
        console.log(err)
    }
}