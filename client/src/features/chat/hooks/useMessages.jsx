import { get_messages } from "../services/messages";
import { useQuery } from '@tanstack/react-query';



export default function useMessage(contact) {

    return useQuery({
        queryKey: ['friend',contact],
        queryFn: () => get_messages(contact),
        enabled: !!contact
    })

}