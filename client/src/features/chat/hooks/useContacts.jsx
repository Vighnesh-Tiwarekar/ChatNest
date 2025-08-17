import { useEffect, useState } from "react"
import { get_contacts } from "../services/contacts"


const useContact = () => {

    const [contacts, setcontacts] = useState(null)

    useEffect(() => {

        const getcontacts = async () => {

            const result = await get_contacts();
            setcontacts(result)
        }

        getcontacts()

    }, [])

    return contacts;

}

export default useContact;