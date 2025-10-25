import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'


const RelatedProducts = ({productData}) => {
    const {products}=useContext(ShopContext);
  return (
    <div>
        <div className='text-center text-3xl py-8'>
            <Title text1='Related' text2='Products' />
            <p className='text-gray-600 mt-2 w-3/4 m-auto text-xs sm:text-sm md-text-base'>Check out products similar to this</p>
        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
          products.slice(0,5).filter((item)=>(
            item._id!==productData._id && item.category===productData.category&& item.subCategory===productData.subCategory &&
            <div key={item._id} className='text-gray-700 cursor-pointer'>
              <ProductItem id={item._id} name={item.name} image={item.image[0]} price={item.price} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts
