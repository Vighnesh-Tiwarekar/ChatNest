import { useEffect, useState } from "react"
import { get_friends } from "../services/friends"


const useFriends = () => {

    const [friends, setfriends] = useState(null)

    useEffect(() => {

        const getfriends = async () => {

            const result = await get_friends();
            setfriends(result)
        }

        getfriends()

    }, [])

    return friends;

}

export default useFriends;