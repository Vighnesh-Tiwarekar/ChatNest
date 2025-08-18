import axios from "axios";


export const get_name = async () => {

    try {

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/services/get-name`,
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if(res.status == 200)
        {
            return res.data
        }

    }
    catch (err) {
        console.log(err)
    }
}