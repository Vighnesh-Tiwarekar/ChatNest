import { useEffect, useState } from "react"
import { get_users } from "../../chat/services/users"


const useUsers = () => {

    const [users, setusers] = useState(null)

    useEffect(() => {

        const getusers = async () => {

            const result = await get_users();
            setusers(result)
        }

        getusers()

    }, [])

    return users;

}

export default useUsers;