import React from 'react'
import useMessage from '../hooks/useMessages'

const Chats = ({ contact }) => {

  const { data, isLoading, error } = useMessage(contact)

  if (contact) {

    return (
      <main className='grow-1 relative px-[15px]'>

        {data ? data.map((message, index) => (
          < div key={index} className="" >
            {message}
          </div >
        )) : 'No messages yet'}

        <section className='left-[1%] bottom-[15px] absolute w-[98%]'>

          <div className='inputbox w-full rounded-[20px] px-[5px]'>

            <input type="text" className='w-full p-[8px]'/>

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