import React, { useEffect } from 'react'
import useMessage from '../hooks/useMessages'
import { useState } from 'react';
import socket from '../functions/socket';
import send from '../assets/send.png'
import '../css/Chats.css'

const Chats = ({ contact, name }) => {

  const { data, isLoading, error } = useMessage(contact);
  const [Messages, setMessages] = useState([])
  const [mssg, setmssg] = useState('')

  useEffect(() => {
    if (data) {
      console.log('New',data)
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {


    socket.on('receive-message', (incoming) => {
      console.log(incoming.message)
      setMessages(prev => [...prev, incoming]);
    });


    return () => {
      socket.off('receive-message');
    };
  }, []);


  const sendmessage = () => {

    if (!mssg.trim()) return;

    socket.emit('send-message', name, contact, mssg);

    setmssg('')

  }

  if (contact) {

    return (
      <main className='grow-1 relative px-[15px] py-[15px]'>

        <div className='flex flex-col'>

          {Messages ? Messages.map((message, index) => (
            < div key={index} className={`mssg ${message.sender == name ? 'send' : 'receive'}`} >
              {message.message}
            </div >
          )) : 'No messages yet'}

        </div>

        <section className='left-[1%] bottom-[15px] absolute w-[98%]'>

          <div className='inputbox w-full rounded-[20px] px-[5px] relative'>

            <input type="text" className='w-full p-[8px]' value={mssg}
              onChange={(e) => setmssg(e.target.value)} />

            <div className='absolute right-[8px] top-[25%]' onClick={sendmessage}>
              <img className='h-[22px]' src={send} alt="" />
            </div>

          </div>

        </section>

      </main>
    )
  }
  else {
    return (
      <>
        <div>
          Nothing to see here
        </div>
      </>
    )
  }

}

export default Chats