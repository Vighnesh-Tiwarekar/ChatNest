import React, { useState } from 'react'
import '../css/ContactList.css'
import useContacts from '../hooks/useContacts'
import Spinner from './Spinner'
import { get_messages } from '../functions/messages'

const Contacts = ({ contacts, search, setcontact }) => {
  return (
    <div className="contact-list">
      {contacts.filter(user => user.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
        <div key={index} className="contact-item p-[18px]" onClick={()=>setcontact(user)}>
          {user}
        </div>
      ))}
    </div>
  )
}

const ContactList = ({setcontact}) => {

  const contacts = useContacts();

  const [search, setsearch] = useState('')

  return (
    <>
      <main className='h-full contactcon'>
        
        <div className='font-bold p-[20px] pb-[7px] text-[22px]'>
          Friends
        </div>

        <div className='px-[10px] py-[15px] pt-[7px]'>
          <div className='inputbox px-[10px] py-[5px]'>
            <input className='w-full' type="text" value={search} placeholder='Search Friends'
              onChange={(e) => setsearch(e.target.value)} />
          </div>
        </div>

        {contacts ? <Contacts contacts={contacts} search={search} setcontact={setcontact} /> : <Spinner></Spinner>}
      </main>
    </>
  )
}

export default ContactList
