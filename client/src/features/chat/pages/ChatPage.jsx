import React, { useEffect, useState } from 'react'
import '../../../shared/css/ChatPage.css'
import FriendList from '../components/FriendList'
import Chats from '../components/Chats'
import Navbar from '../../../shared/ui_components/Navbar'
import socket from '../services/socket'
import { get_name } from '../services/name'
import { UserList } from '../components/UserList'
import SideBar from '../components/SideBar'

const ChatPage = () => {

  const [open_pg, setopen_pg] = useState('friends')
  const [mobview, setmobview] = useState(false)
  const [friend, setfriend] = useState('')
  const [name, setname] = useState('')

  useEffect(() => {
    
    if (window.matchMedia("(max-width: 450px)").matches) {
      setmobview(true)
    }
    else {
      setmobview(false)
    }
  })

  useEffect(() => {

    const getname = async () => {

      const result = await get_name();
      setname(result)
    }

    getname()

  }, [])

  useEffect(() => {

    if (name) {
      socket.emit('join-room', name);
    }

  }, [name])

  return (
    <>
      {!mobview && <main className='chatpage-con relative pt-[5vh]'>

        <aside className='absolute w-fit left-0'>
          <Navbar open_pg={open_pg} setopen_pg={setopen_pg}></Navbar>
        </aside>

        <section className='chatsec flex'>
          
          <SideBar open_pg={open_pg} setfriend={setfriend} ></SideBar>

          <Chats friend={friend} name={name}></Chats>
        </section>

      </main>}

      {mobview && <main className='chatpage-con relative'>

        {!open_pg && <div>
          <FriendList setfriend={setfriend}></FriendList>
        </div>}


      </main>}
    </>
  )
}

export default ChatPage