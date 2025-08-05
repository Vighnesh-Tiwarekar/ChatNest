import axios from "axios";


export const validate = async() => {

    try{

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/login/validate`,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: 'include'
        })

        return res.status==200

    }
    catch(err)
    {
        console.log(err)
        return false;
    }
}