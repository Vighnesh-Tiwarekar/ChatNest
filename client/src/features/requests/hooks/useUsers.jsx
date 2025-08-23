import { useEffect, useState } from "react"
import { get_users } from "../../chat/services/users"
import { useQuery } from "@tanstack/react-query"


const useUsers = () => {

    return useQuery({
        queryKey: ['users'],
        queryFn: get_users
    })

}

export default useUsers;