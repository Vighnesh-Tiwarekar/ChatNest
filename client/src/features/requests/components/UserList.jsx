import React, { useState } from 'react'
import useUsers from '../hooks/useUsers';
import Spinner from '../../../shared/ui_components/Spinner.jsx';
import { Confirm } from './Confirm';
import { send_request } from '../services/requests';


const Friends = ({ users, search }) => {

    const [contact, setcontact] = useState('')

    const confirm_send = (name) => {

        setcontact(name);
    }

    const handleConfirm = (response) => {
        if (response === true) {

            send_request(contact)
            
        }
        
        setcontact('');
    };

    return (
        <div className="friend-list">
            {search &&
                users
                    .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
                    .map((user, index) => (
                        <div key={index} className="friend-item p-[18px] glass txteffect" onClick={() => confirm_send(user.username)}>
                            {user.username}
                        </div>
                    ))}

            {contact && <Confirm handleConfirm={handleConfirm} contact={contact} ></Confirm>}

        </div>
    )
}

export const UserList = () => {

    const users = useUsers();

    const [search, setsearch] = useState('')

    return (
        <>
            <main className={`h-full friendcon`}>

                <div className='font-bold p-[20px] pb-[7px] text-[22px]'>
                    Users
                </div>

                <div className='px-[10px] py-[15px] pt-[7px]'>
                    <div className='inputbox px-[10px] py-[5px]'>
                        <input className='w-full' type="text" value={search} placeholder='Search Users'
                            onChange={(e) => setsearch(e.target.value)} />
                    </div>
                </div>

                {users ? <Friends users={users} search={search} /> : <Spinner></Spinner>}
            </main>
        </>
    )

}
