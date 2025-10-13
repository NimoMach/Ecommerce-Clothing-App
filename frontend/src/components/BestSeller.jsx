import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestSellers = products.filter((product) => (product.bestSeller));
    setBestSeller(bestSellers.reverse().slice(0, 10));
  }, [products]);
  return (
    <>
      <div className='text-center text-3xl py-8'>
        <Title text1={'Best'} text2={'Sellers'} />
        <p className='text-gray-600 mt-2 w-3/4 m-auto text-xs sm:text-sm md-text-base'>Our top selling products</p>
      </div>
      {/* Rendering Best Seller Products */}
      <div className='pt-3 pb-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {bestSeller.map((item) => (
          <div key={item.id} className='text-gray-700 cursor-pointer'>
            <ProductItem id={item._id} name={item.name} image={item.image[0]} price={item.price} />
          </div>
        ))}
      </div>
    </>
  )
}

export default BestSeller
