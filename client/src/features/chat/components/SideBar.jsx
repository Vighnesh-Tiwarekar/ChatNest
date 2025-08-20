import React, { useEffect, useState } from 'react'
import FriendList from './FriendList'
import '../../../shared/css/SideBar.css'
import { UserList } from './UserList'
import FriendRequest from './FriendRequest'

const SideBar = ({ open_pg, setfriend, name }) => {

    const [visiblePage, setvisiblePage] = useState('');

    useEffect(() => {

        if (open_pg) {

            setvisiblePage(open_pg);

        }
        else {

            const timeout = setTimeout(() => {
                setvisiblePage('');
            }, 500);

            return () => clearTimeout(timeout);

        }

    }, [open_pg])

    return (
        <main className={`h-full sidecon ${open_pg ? 'side-open' : 'side-close'}`}>

            <div className={visiblePage === 'friends' ? '' : 'hidden'}>
                <FriendList setfriend={setfriend} />
            </div>

            <div className={visiblePage === 'users' ? '' : 'hidden'}>
                <UserList />
            </div>

            <div className={visiblePage === 'requests' ? '' : 'hidden'}>
                <FriendRequest name={name} />
            </div>


        </main>
    )
}

export default SideBar