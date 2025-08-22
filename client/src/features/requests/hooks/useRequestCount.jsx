import { useEffect, useState } from "react"
import { get_request_count } from "../services/requests";


export const useRequestCount = () => {

    const [count, setcount] = useState(0);

    useEffect(()=> {

        const get_count = async() => {

            const result = await get_request_count();
            setcount(result)
        }

        get_count()

    },[])

    return count;

}