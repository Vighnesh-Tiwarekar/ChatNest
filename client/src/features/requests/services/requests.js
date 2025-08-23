import axios from "axios";
import { queryClient } from "../../auth/services/queryClient";

export const get_requests = async () => {

    console.log('req')

    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/services/get-requests`,
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (res.status == 200) {
            return res.data
        }

        return []

    }
    catch (err) {
        console.log(err)
        return []
    }
}

export const get_request_count = async () => {

    try {

        console.log('Count Request')

        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/services/active-requests`,
            {
                withCredentials: true, // send cookies if needed
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (res.status == 200) {
            return res.data;
        }

        return 0;

    }
    catch (err) {
        console.log(`Error ${err}`)
        return 0;
    }
}

export const send_request = async (contact) => {

    try {

        const result = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/services/send-request`,
            {
                name: contact,
            },
            {

                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }

            })


    }
    catch (err) {
        console.log(`Error ${err}`)
    }
}

export const accept_request = async (name) => {

    try {

        const result = await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/services/accept-request`,
            {
                name: name
            },
            {

                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        if (result.status == 200) {

            queryClient.refetchQueries({ queryKey: ['friends'] });
            queryClient.refetchQueries({ queryKey: ['requests'] });
            queryClient.refetchQueries({ queryKey: ['users'] });
        }


    }
    catch (err) {
        console.log(`Error ${err}`)
    }
}

export const reject_request = async (name) => {

    try {
        const result = await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/services/reject-request`,
            {
                name: name
            },
            {

                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        if (result.status == 200) {

            queryClient.refetchQueries({ queryKey: ['friends'] });
            queryClient.refetchQueries({ queryKey: ['requests'] });
            queryClient.refetchQueries({ queryKey: ['users'] });
        }


    }
    catch (err) {
        console.log(`Error ${err}`)
    }
}

export const cancel_request = async (name) => {

    try {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/services/cancel-request`,
            {
                data: {
                    name: name
                },

                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        if (result.status == 200) {

            queryClient.refetchQueries({ queryKey: ['friends'] });
            queryClient.refetchQueries({ queryKey: ['requests'] });
            queryClient.refetchQueries({ queryKey: ['users'] });
        }

    }
    catch (err) {
        console.log(`Error ${err}`)
    }
}