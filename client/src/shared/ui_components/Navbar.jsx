import React from 'react'
import '../css/Navbar.css'
import friends from '../../assets/friends.png'

const Navbar = ({setopen_pg}) => {
  return (
    <>
        <main className='w-[3.5vw] flex flex-row justify-center items-center navbar'>

            <div className='w-fit' onClick={() => setopen_pg(previsopen => !previsopen)}>
                <img className='w-[2vw] invert-100' src={friends} alt="" />
            </div>

        </main>
    </>
  )
}

export default Navbar