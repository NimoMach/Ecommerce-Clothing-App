import React from 'react'

const NewsLetterBox = () => {
    const handleSubscribe = (e) => {
        e.preventDefault(); 
        alert("Thank you for subscribing!");
        // Here you can add logic to handle the subscription, e.g., sending the email to your server
    }
  return (
    <div className='bg-gray-100 py-10 mt-20 items-center text-center gap-6 text-sm sm:text-base text-gray-700'>
        <p className='text-2xl text-gray-800 font-medium'>Subscribe Now and Get 20% OFF</p>
        <p>Join our newsletter to stay updated with the latest news and special sales. Let's your email address here!</p>
        <form onSubmit={handleSubscribe} className='w-full sm:w-1/2 flex flex-col sm:flex-row gap-4 items-center justify-center mx-auto mt-4'>
            <input className='p-2 border border-gray-300 rounded' type="email" placeholder='Enter your email' required />
            <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
