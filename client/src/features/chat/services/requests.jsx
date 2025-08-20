import axios from "axios";


export const get_requests = async () => {

    try {

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/chat/get-requests`,
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

        return []

    }
    catch (err) {
        console.log(err)
        return []
    }
}