import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white py-6 mt-40 text-center text-sm sm:text-base'>
      <div className='flex flex-col sm:flex-row justify-around items-center gap-4'>
        <div className='flex gap-4'>
          <h1 className='text-5xl font-semi-bold'>I-Shop</h1>
      </div>
        <div className='flex flex-col'>
        <h1 className='font-bold gap-4'>I-Shop Company</h1>
         <a href="/" className='hover:underline'>Home</a> 
          <a href="/about" className='hover:underline'>About</a> 
          <a href="/privacy" className='hover:underline'>Privacy Policy</a>
          <a href="/terms" className='hover:underline'>Terms & Conditions</a> 
        </div>
        <div className='flex flex-col gap-4'>
        <h1 className='font-bold'>Contact Us</h1>
         <ul className='list-none p-0 m-0'>
            <li>Email:contact@ishop.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Main St, City, Country</li>    
        </ul> 
        </div>
      </div>    
      <p className='mt-5'>&copy; {new Date().getFullYear()} I-Shop Company. All rights reserved.</p>
    </div>
  )
}

export default Footer
