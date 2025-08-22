import React, { useState } from 'react'
import '../../../shared/css/FriendRequest.css'
import Spinner from '../../../shared/ui_components/Spinner'
import useRequests from '../hooks/useRequests'
import { accept_request, cancel_request, reject_request } from '../services/requests'


const Sent = ({ user }) => {

    const cancel_req = async (contact) => {
        await cancel_request(contact);

    }

    return (
        <div className="friend-item px-[18px] py-[10px] txteffect">
            {user.status == 'pending' &&
                <div className='flex justify-between items-center'>
                    <div className=''>Request to {user.receiver.toUpperCase()}</div>
                    <button className='w-fit btn txteffect glass' onClick={() => cancel_req(user.receiver)}>Cancel</button>
                </div>
            }

            {user.status != 'pending' &&

                <div>
                    {user.receiver} {user.status} you request
                </div>

            }
        </div>
    )
}


const Received = ({ user }) => {

    const accept_req = async (contact) => {
        await accept_request(contact);

    }

    const reject_req = async (contact) => {
        await reject_request(contact);

    }

    return (

        <div className="friend-item px-[18px] py-[10px] txteffect">
            {user.status == 'pending' &&
                <div className='flex justify-between items-center'>
                    <div>{user.sender}</div>
                    <div className='flex justify-center gap-[20px] items-center'>
                        <button className='w-fit mx-auto btn txteffect glass' onClick={() => accept_req(user.sender)}>Accept</button>
                        <button className='w-fit mx-auto btn txteffect glass' onClick={() => reject_req(user.sender)}>Reject</button>
                    </div>
                </div>
            }

            {user.status != 'pending' &&
                <div>
                    {user.sender}'s request was {user.status}
                </div>
            }

        </div>
    )

}


const Requests = ({ requests, choice, name }) => {
    return (
        <div className="friend-list">
            {requests.filter(user => (choice == 1 || choice == -1) ? user.sender != name : user.sender == name).map((user, index) => user.sender == name ? (
                <Sent key={index} user={user} name={name} ></Sent>
            ) : (
                <Received key={index} user={user} name={name} ></Received>
            ))}
        </div>
    )
}

const FriendRequest = ({ name }) => {

    const requests = useRequests();

    const [choice, setchoice] = useState(1)

    return (
        <>
            <main className={`h-full friendcon`}>

                <div className='font-bold p-[20px] pb-[7px] text-[22px] whitespace-nowrap'>
                    Friend Requests
                </div>

                <div className='px-[10px] py-[15px] pt-[7px] relative '>

                    <div className='relative'>

                        <div className='inputbox px-[10px] py-[5px] z-10'>
                            {(choice == 1 || choice == -1) && <div onClick={() => setchoice(-1)}>Received</div>}
                            {(choice == 2 || choice == -2) && <div onClick={() => setchoice(-2)}>Sent</div>}
                        </div>

                        <div className={`${choice < 0 ? 'choice-open' : 'choice-close'} request-choice w-full absolute z-10`}>
                            <div onClick={() => setchoice(1)} className='inputbox px-[10px] py-[5px]'>Received</div>
                            <div onClick={() => setchoice(2)} className='inputbox px-[10px] py-[5px]'>Sent</div>
                        </div>

                    </div>

                </div>

                {requests ? <Requests requests={requests} choice={choice} name={name} /> : <Spinner></Spinner>}

            </main>
        </>
    )
}

export default FriendRequest;
