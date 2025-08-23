import { useEffect, useState } from "react"
import { get_requests } from "../services/requests"
import { useQuery } from "@tanstack/react-query"


const useRequests = () => {

    return useQuery({
        queryKey: ['requests'],
        queryFn: get_requests
    })

}

export default useRequests;