import { useEffect, useState } from "react"
import { get_request_count } from "../services/requests";
import { useQuery } from "@tanstack/react-query"


export const useRequestCount = () => {

    return useQuery({
        queryKey: ['count'],
        queryFn: get_request_count,
        staleTime: 1000 * 60,
        refetchInterval: 10000
    })

}