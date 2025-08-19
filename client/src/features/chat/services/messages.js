import axios from "axios";


export const get_messages = async(friend_name) => {

    try{

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/chat/get-messages`,
            {
                friend_name: friend_name
            },
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if(res.status == 202)
        {
            return res.data
        }

    }
    catch(err)
    {
        console.log(err)
    }
}