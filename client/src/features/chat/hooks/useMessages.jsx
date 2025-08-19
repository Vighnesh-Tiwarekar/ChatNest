import { get_messages } from "../services/messages";
import { useQuery } from '@tanstack/react-query';



export default function useMessage(friend) {

    return useQuery({
        queryKey: ['friend',friend],
        queryFn: () => get_messages(friend),
        enabled: !!friend
    })

}