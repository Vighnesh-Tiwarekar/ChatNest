import React from 'react'
import '../css/Navbar.css'
import friends from '../../assets/friends.png'
import search_users from '../../assets/search_users.png'
import add_friend from '../../assets/add-friend.png'

const Navbar = ({ open_pg, setopen_pg }) => {

  const set_page = (page) => {

    if (page == open_pg) {
      setopen_pg('');
    }
    else {
      setopen_pg(page);
    }
  }


  return (
    <>
      <main className='w-[3.5vw] flex flex-col gap-y-[15px] justify-center items-center navbar'>

        <div className='w-fit' onClick={() => set_page('friends')}>
          <img className='h-[4vh] invert-100' src={friends} alt="" />
        </div>

        <div className='w-fit' onClick={() => set_page('users')}>
          <img className='h-[4vh] invert-100' src={search_users} alt="" />
        </div>

        <div className='w-fit mt-[0.2vh]' onClick={() => set_page('requests')}>
          <img className='h-[3.8vh] invert-100' src={add_friend} alt="" />
        </div>

      </main>
    </>
  )
}

export default Navbar