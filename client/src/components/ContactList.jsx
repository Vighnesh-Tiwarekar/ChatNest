import React from 'react'
import '../css/ContactList.css'
import useContacts from '../hooks/useContacts'
import Spinner from './Spinner'
import { get_messages } from '../functions/messages'

const Contacts = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.map((user, index) => (
        <div key={index} className="contact-item">
          {user} {/* ✅ render specific field, not whole object */}
        </div>
      ))}
    </div>
  )
}

const ContactList = () => {

    const contacts = useContacts();

    return (
        <>
            <main className='h-full bg-white contactcon'>
                {contacts ? <Contacts contacts={contacts} /> : <Spinner></Spinner>}
            </main>
        </>
    )
}

export default ContactList
