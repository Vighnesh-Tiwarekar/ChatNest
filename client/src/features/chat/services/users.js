import axios from "axios";


export const get_users = async () => {

    try {

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/chat/get-users`,
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if(res.status == 201)
        {
            return res.data
        }

    }
    catch (err) {
        console.log(err)
    }
}