
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

import React, { useState } from 'react'
import Title from '../components/Title'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    // Here you can implement actual API call to send the message
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-[70vh] flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 px-4 sm:px-8">
      {/* Contact Form */}
      <form
        onSubmit={handleFormSubmission}
        className="flex-1 flex flex-col gap-4 sm:gap-6"
      >
        <div className='text-2xl'>
        <Title text1="Contact" text2="Us" />
        <p className="text-gray-600 text-sm sm:text-base">
          Have a question or want to get in touch? Fill out the form below.
        </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={onChangeHandler}
            required
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={onChangeHandler}
            required
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={onChangeHandler}
          required
          className="w-full border p-2 rounded text-sm sm:text-base"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={onChangeHandler}
          required
          rows={6}
          className="w-full border p-2 rounded text-sm sm:text-base resize-none"
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white w-full sm:w-auto px-6 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info Section */}
      <img src={assets.contact} alt="" className='w-1/2'/>
    </div>
  )
}


export default Contact
