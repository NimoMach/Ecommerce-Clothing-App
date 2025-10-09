import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='bg-gray-100 py-10 mt-20 flex flex-col sm:flex-row justify-around items-center text-center gap-6 text-sm sm:text-base text-gray-700'>
        
      <div>
        <h2 className='font-bold text-lg mb-2'>Free Shipping</h2>
        <p className=''>Enjoy free shipping on all orders over $50. Shop now and save!</p>
        <img className='w-20 mt-2 m-auto' src={assets.delivery} alt="free-shipping"/>
        <div className='mt-4'>
        <h2 className='font-bold text-lg mb-2'>24/7 Support</h2>
        <p>Our support team is here to help you anytime, anywhere.</p>
        <img className='w-20 mt-2 m-auto' src={assets.customer_support} alt="support"/>
        </div>
      </div>
      <div > 
        <h2 className='font-bold text-lg mb-2'>Secure Payment</h2>
        <p>Shop with confidence knowing your payment information is safe with us.</p>
        <img className='w-20 mt-2 m-auto' src={assets.lock} alt="secure-payment"/>
        <div className='mt-4'>
        <h2 className='font-bold text-lg mb-2'>Easy Return</h2>
        <p>We offer hassle free exchange policy</p>
        <img className='w-20 mt-2 m-auto' src={assets.return_icon} alt="easy-return"/> 
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
