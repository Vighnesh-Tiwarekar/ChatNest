import React, { useEffect, useState } from 'react'
import '../css/ChatPage.css'
import ContactList from './ContactList'
import Chats from './Chats'
import Navbar from './Navbar'
import socket from '../functions/socket'
import { get_name } from '../functions/name'

const ChatPage = () => {

  const [open_pg, setopen_pg] = useState(false)
  const [mobview, setmobview] = useState(false)
  const [contact, setcontact] = useState('')
  const [name, setname] = useState('')

  useEffect(() => {
    console.log(open_pg)
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
          <Navbar setopen_pg={setopen_pg}></Navbar>
        </aside>

        <section className='chatsec hidden mob:flex'>
          {!open_pg && <ContactList setcontact={setcontact}></ContactList>}
          <Chats contact={contact} name={name}></Chats>
        </section>

      </main>}

      {mobview && <main className='chatpage-con relative'>

        {!open_pg && <div>
          <ContactList setcontact={setcontact}></ContactList>
        </div>}


      </main>}
    </>
  )
}

export default ChatPage