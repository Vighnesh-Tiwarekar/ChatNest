import React, { useEffect, useLayoutEffect, useRef } from 'react'
import useMessage from '../hooks/useMessages'
import { useState } from 'react';
import socket from '../services/socket';
import send from '../../../assets/send.png'
import '../../../shared/css/Chats.css'

const Chats = ({ contact, name }) => {

  const { data, isLoading, error } = useMessage(contact);
  const [Messages, setMessages] = useState([])
  const [mssg, setmssg] = useState('')

  const bottomRef = useRef(null);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [Messages]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {


    socket.on('receive-message', (incoming) => {

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

      <main className='flex flex-col flex-1 h-full justify-between'>

        <section className='glass font-bold p-[15px] text-[22px] h-fit'>
          {contact}
        </section>


        <section className='flex-1 overflow-auto no-scrollbar mssg-con px-[15px] py-[15px]'>

          <div className='flex flex-col'>

            {Messages ? Messages.map((message, index) => (
              < div key={message._id} className={`mssg txteffect no-hover glass ${message.sender == name ? 'send' : 'receive'}`} >
                {message.message}
              </div >
            )) : 'No messages yet'}

            <div ref={bottomRef} />

          </div>

        </section>


        <section className='w-full px-[8px] pb-[13px]'>

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