import { useEffect, useState } from "react"
import { validate } from "../functions/validate"


export default function useLoginStatus() {

    const [islogin, setlogin] = useState(null)

    useEffect(()=> {

        const checkLogin = async() => {

            const result = await validate();
            setlogin(result)
        }

        checkLogin()

    },[])

    return islogin;
}