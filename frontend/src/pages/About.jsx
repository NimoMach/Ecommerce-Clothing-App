import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl border-t text-center px-4 sm:px-20 lg:px-40 py-10'>
        <Title text1='About' text2='Us'/>
      </div>
      <div className='flex flex-col sm:flex-row gap-6 mt-6 text-lg text-justify '>
        <img src={assets.about_banner} alt="about_us" className='w-full h-50 sm:h-150 object-contain'/>
        <div className='m-5'>
          <p>Welcome to our e-commerce store! We are dedicated to providing you with the best online shopping experience. </p>
          <p>Our mission is to offer a wide range of high-quality products at competitive prices, along with exceptional customer service. Our team is passionate about curating a diverse selection of items to meet your needs and preferences. </p>
          <p>Whether you're looking for the latest fashion trends, cutting-edge electronics, or unique home decor, we've got you covered.</p>
          <br/>
          <b>Our mission</b>
          <p>is to make online shopping easy, convenient, and enjoyable for everyone. We believe in building lasting relationships with our customers by prioritizing their satisfaction and trust. Thank you for choosing us as your go-to destination for all your shopping needs. We look forward to serving you!</p>
        </div>
      </div>
      {/*Quality Assurance Section*/}
      <div className='mt-10 text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Our Commitment to Quality</h2>
        <p className='text-gray-600 mb-6 px-4 sm:px-20 lg:px-40'>We take pride in our commitment to quality and customer satisfaction. Here are some of the key aspects that set us apart:</p>
        <div className='flex flex-col sm:flex-row gap-6 justify-center'>
          <div className='flex flex-col items-center px-4'>
            <img src={assets.quality} alt="quality" className='w-40 h-40 object-contain'/>
            <h3 className='text-xl font-medium mt-4'>100% Original Products</h3>
            <p className='text-gray-600 mt-2'>We source our products from authorized stores only to ensure authenticity and quality.</p>
          </div>
          <div className='flex flex-col items-center px-4'>
            <img src={assets.quality_1} alt="quality_check" className='w-40 h-40 object
-contain'/>
            <h3 className='text-xl font-medium mt-4'>Quality Checked</h3>
            <p className='text-gray-600 mt-2'>Each product is thoroughly checked before dispatch to ensure it meets our quality standards.</p>
          </div>
          <div className='flex flex-col items-center px-4'>
            <img src={assets.best_price} alt="best_price" className='w-40 h-40 object-cont
ain'/>
            <h3 className='text-xl font-medium mt-4'>Best Price</h3>
            <p className='text-gray-600 mt-2'>We offer the best prices on all products, ensuring great value for your money.</p>
          </div>
        </div>
      </div>
      <NewsLetterBox/>
    </div>

  )
}

export default About
