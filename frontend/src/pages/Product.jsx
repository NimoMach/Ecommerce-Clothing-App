import React, { useEffect, useContext, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [size, setSize] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    const product = products.find(item => item._id === productId)
    if (product) {
      setProductData(product)
      setSelectedImage(product.image[0])
    }
  }, [productId, products])

  if (!productData) return <div className='opacity-0'>Loading...</div>

  // Open modal for image popup
  const openImageModal = () => setShowImageModal(true)
  // Close modal
  const closeImageModal = () => setShowImageModal(false)

  return (
    <Fragment>
      <div className='my-10 flex flex-col md:flex-row gap-6'>
        <div className='md:w-1/2'>
          {/* Product Images */}
          <div className='flex flex-col gap-3'>
            <div className='flex overflow-x-auto gap-3 mb-6 sm:mb-4'>
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${productData.name}-${index}`}
                  className={`w-24 h-24 object-cover border cursor-pointer hover:opacity-75 ${
                    selectedImage === img ? 'border-black' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className='cursor-pointer' onClick={openImageModal}>
              <img
                src={selectedImage}
                alt='selected product'
                className='w-[500px] h-[500px] object-contain rounded-md mx-auto'
              />
            </div>
          </div>
        </div>
        <div className='md:w-1/2'>
          <h2 className='text-3xl font-bold mb-4'>{productData.name}</h2>
          <div className='flex items-center mb-4'>
            <span className='text-yellow-500 font-bold mr-2'>Rating: {productData.rating}</span>
            {[1, 2, 3, 4, 5].map(star => {
              const starIcon =
                productData.rating >= star
                  ? assets.full_rating_star
                  : productData.rating >= star - 0.5
                  ? assets.half_rating_star
                  : assets.no_rating_star
              return <img key={star} src={starIcon} alt='star' className='w-4 h-4' />
            })}
            <span className='text-gray-500'>( reviews)</span>
          </div>
          <p className='text-xl font-semibold mb-4'>
            Price: {currency}
            {productData.price}
          </p>
          <p className='text-gray-600 mb-4'>{productData.description}</p>
          <p className='text-gray-700 mb-4'>Available Sizes: {productData.sizes.join(', ')}</p>
          <div className='flex items-center gap-4 mb-6'>
            <p>Select Size</p>
            <div className='flex gap-3'>
              {productData.sizes.map(xs => (
                <div
                  key={xs}
                  onClick={() => setSize(xs)}
                  className={`border rounded w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-200 ${
                    size === xs ? 'bg-black text-white' : ''
                  }`}
                >
                  {xs}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className={`px-6 py-3 rounded text-white ${
              size ? 'bg-black hover:bg-gray-700' : 'bg-gray-400 cursor-not-allowed'
            } transition`}
          >
            Add to Cart
          </button>

          <hr className='my-6' />
          <div className='text-sm text-gray-600 space-y-2'>
            <p>
              <span className='font-semibold'>100% Original:</span> Products are sourced from authorized
              stores only
            </p>
            <p>
              <span className='font-semibold'>Quality Checked:</span> Each product is thoroughly checked
              before dispatch
            </p>
            <p>
              <span className='font-semibold'>Best Price:</span> We offer the best prices on all products
            </p>
          </div>

          <hr className='my-6' />
          <div className='flex gap-6'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <img src={assets.full_rating_star} alt='star' className='w-5 h-5' />
              <p className='text-sm'>Write a Review</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
              <img src={assets.heart} alt='heart' className='w-5 h-5' />
              <p className='text-sm'>Add to Wishlist</p>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
              <img src={assets.share} alt='share' className='w-5 h-5' />
              <p className='text-sm'>Share</p>
            </div>
          </div>
        </div>
      </div>

      {/* toggle description and reviews */}
      <hr className='my-6' />
      <div className='mb-10'>
        <div className='flex gap-6 border-b mb-6'>
          <p className='pb-2 cursor-pointer font-semibold border-b-2 border-black'>Description</p>
          <p className='pb-2 cursor-pointer text-gray-500'>Reviews (0)</p>
        </div>
        <p className='text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et
          faucibus. Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus
          congue et, vulputate ut ligula. Vestibulum sit amet urna turpis. Mauris euismod elit et nisi
          ultrices, ut faucibus orci tincidunt. Mauris et velit vitae ligula efficitur luctus. Proin in
          magna a ipsum viverra scelerisque. Pellentesque ac bibendum tortor, vel faucibus enim. Morbi
          nec quam nec dui venenatis eleifend. Ut non libero magna. Sed et quam lacus. Fusce condimentum
          eleifend enim a feugiat.
        </p>
      </div>

      {/* You may also like */}
      <div className='my-10'>
        {/* Rendering similar Products */}
        <RelatedProducts productData={productData} />
      </div>

      {/* Image modal popup */}
      {showImageModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'
          onClick={closeImageModal}
        >
          <div
            className='relative bg-white rounded-md p-4 max-w-lg max-h-[80vh] overflow-auto'
            onClick={e => e.stopPropagation()}
          >
            <button
              className='absolute top-2 right-2 text-black text-xl font-bold hover:text-red-600'
              onClick={closeImageModal}
              aria-label='Close image modal'
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt='selected product'
              className='max-w-full max-h-[70vh] object-contain rounded-md'
            />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Product
