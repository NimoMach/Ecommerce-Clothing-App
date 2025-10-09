import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <div className="block text-gray-800">
      <div className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300 text-center">
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover rounded-md mb-3"
        />
        <div className='flex flex-col items-start'>
          <h3 className="font-semibold text-lg mb-1 truncate">{name}</h3>
          <p className="text-gray-600 mb-3">{currency}{price}</p>
          <Link to={`/product/${id}`} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            View More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
