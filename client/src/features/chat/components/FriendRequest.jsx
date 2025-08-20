import React, { useState } from 'react'
import '../../../shared/css/FriendRequest.css'
import Spinner from '../../../shared/ui_components/Spinner'
import useRequests from '../hooks/useRequests'

const Requests = ({ requests, choice, name }) => {
    return (
        <div className="friend-list">
            {requests.filter(user => choice == 1 ? user.sender != name : user.sender == name).map((user, index) => user.sender == name ? (
                <div key={index} className="friend-item p-[18px] glass txteffect">
                    <div className='flex justify-center items-center'>
                        {user.sender}
                        <button className='w-fit mx-auto block btn txteffect glass mt-[10px]'>Cancel</button>
                    </div>
                    <div>Request {user.receiver.toUpperCase()}</div>
                </div>
            ) : (
                <div key={index} className="friend-item p-[18px] glass txteffect">
                    <div>{user.sender}</div>
                    <div className='flex justify-center items-center gap-[5px]'>
                        <button className='w-fit mx-auto btn txteffect glass'>Accept</button>
                        <button className='w-fit mx-auto btn txteffect glass'>Reject</button>
                    </div>
                </div>
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

                        <div className='inputbox px-[10px] py-[5px]'>
                            {(choice == 1 || choice == -1) && <div onClick={() => setchoice(-1)}>Received</div>}
                            {(choice == 2 || choice == -2) && <div onClick={() => setchoice(-2)}>Sent</div>}
                        </div>

                        <div className={`${choice < 0 ? 'choice-open' : 'choice-close'} request-choice w-full absolute`}>
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
