import React, { useEffect, useState } from 'react'
import '../../../shared/css/ChatPage.css'
import FriendList from '../components/FriendList'
import Chats from '../components/Chats'
import Navbar from '../../../shared/ui_components/Navbar'
import socket from '../services/socket'
import { get_name } from '../services/name'
import SideBar from '../components/SideBar'

const ChatPage = () => {

  const [open_pg, setopen_pg] = useState(() => localStorage.getItem('open_pg') || 'friends')
  const [mobview, setmobview] = useState(false)
  const [friend, setfriend] = useState(() => localStorage.getItem('friend') || '')
  const [name, setname] = useState('')

  useEffect(() => {
    localStorage.setItem('open_pg', open_pg)
  }, [open_pg])

  useEffect(() => {
    localStorage.setItem('friend', friend)
  }, [friend])


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

          <SideBar open_pg={open_pg} setfriend={setfriend} name={name}></SideBar>

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