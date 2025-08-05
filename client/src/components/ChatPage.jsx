import React from 'react'
import '../css/ChatPage.css'
import ContactList from './ContactList'

const ChatPage = () => {
  return (
    <>
      <div>
        {/* <main className='chatsec'></main> */}
        <ContactList></ContactList>
      </div>
    </>
  )
}

export default ChatPage