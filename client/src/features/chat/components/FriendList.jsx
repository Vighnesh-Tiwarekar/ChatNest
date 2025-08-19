import React, { useState } from 'react'
import '../../../shared/css/FriendList.css'
import Spinner from '../../../shared/ui_components/Spinner'
import useFriends from '../hooks/useFriends'

const Friends = ({ friends, search, setfriend }) => {
  return (
    <div className="friend-list">
      {friends.filter(user => user.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
        <div key={index} className="friend-item p-[18px] glass txteffect" onClick={()=>setfriend(user)}>
          {user}
        </div>
      ))}
    </div>
  )
}

const FriendList = ({setfriend, open_pg}) => {

  const friends = useFriends();

  const [search, setsearch] = useState('')

  return (
    <>
      <main className={`h-full friendcon ${open_pg ? 'friend-close' : 'friend-open'}`}>
        
        <div className='font-bold p-[20px] pb-[7px] text-[22px]'>
          Friends
        </div>

        <div className='px-[10px] py-[15px] pt-[7px]'>
          <div className='inputbox px-[10px] py-[5px]'>
            <input className='w-full' type="text" value={search} placeholder='Search Friends'
              onChange={(e) => setsearch(e.target.value)} />
          </div>
        </div>

        {friends ? <Friends friends={friends} search={search} setfriend={setfriend} /> : <Spinner></Spinner>}
      </main>
    </>
  )
}

export default FriendList
