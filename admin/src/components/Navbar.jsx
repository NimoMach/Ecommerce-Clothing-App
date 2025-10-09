import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <h1 className='font-bold text-2xl'>I-Shop Admin Panel</h1>
      <button onClick={()=>setToken('')} className='bg-black hover:bg-gray-700 px-5 py-2 sm:px-7 sm:py-2 m-4 text-white rounded cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
