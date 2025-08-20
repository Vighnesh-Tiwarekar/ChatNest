import { useEffect, useState } from "react"
import { get_requests } from "../services/requests"


const useRequests = () => {

    const [requests, setrequests] = useState(null)

    useEffect(() => {

        const getrequests = async () => {

            const result = await get_requests();
            setrequests(result)
        }

        getrequests()

    }, [])

    return requests;

}

export default useRequests;