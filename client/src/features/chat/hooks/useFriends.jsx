import { useEffect, useState } from "react"
import { get_friends } from "../services/friends"
import { useQuery } from "@tanstack/react-query"


const useFriends = () => {

    return useQuery({
        queryKey: ['friends'],
        queryFn: get_friends
    })

}

export default useFriends;