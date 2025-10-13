import React, { useEffect, useContext,useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState('');
  const [size,setSize]=useState('');

  const fetchProductData=async()=>{
    const product=products.find((item)=>item._id===productId);
    setProductData(product);
    setImage(product.image[0]);
    return null
  }

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  
  return productData?(
    <Fragment>
    <div className='my-10 flex flex-col md:flex-row gap-6'>
      <div className='md:w-1/2'>
        {/* Product Images */}
        <div className='flex-1 flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-row overflow-x-auto sm:overflow-x-scroll justify-start gap-3 mb-6 sm:mb-4'>
            {
              productData.image.map((img,index)=>(
                <img onClick={()=>setImage(img)} key={index} src={img} alt={`${productData.name}-${index}`} className='w-20 h-20 object-cover border cursor-pointer hover:opacity-75'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="product-image" className='w-full h-min-50 h-max-200 object-cover'/>
          </div>
        </div>
      </div>
      <div className='md:w-1/2'>
        <h2 className='text-3xl font-bold mb-4'>{productData.name}</h2>
        <div className='flex items-center mb-4'>
          <span className='text-yellow-500 font-bold mr-2'>Rating: {productData.rating}</span>
          {/* Display stars based on rating */}
          <img src={productData.rating>=1?assets.full_rating_star:(productData.rating>=0.5?assets.half_rating_star:assets.no_rating_star)} alt="star" className='w-4 h-4'/>
          <img src={productData.rating>=2?assets.full_rating_star:(productData.rating>=1.5?assets.half_rating_star:assets.no_rating_star)} alt="star" className='w-4 h-4'/>
          <img src={productData.rating>=3?assets.full_rating_star:(productData.rating>=2.5?assets.half_rating_star:assets.no_rating_star)} alt="star" className='w-4 h-4'/>
          <img src={productData.rating>=4?assets.full_rating_star:(productData.rating>=3.5?assets.half_rating_star:assets.no_rating_star)} alt="star" className='w-4 h-4'/>
          <img src={productData.rating>=5?assets.full_rating_star:(productData.rating>=4.5?assets.half_rating_star:assets.no_rating_star)} alt="star" className='w-4 h-4'/>
          <span className='text-gray-500'>( reviews)</span>
        </div>
        <p className='text-xl font-semibold mb-4'>Price: {currency}{productData.price}</p>
        <p className='text-gray-600 mb-4'>{productData.description}</p>
        
        
        <p className='text-gray-700 mb-4'>Available Sizes: {productData.sizes.join(', ')}</p>
        <div className='flex items-center gap-4 mb-6'>
          <p>Select Size</p>
          <div className='flex gap-3'>
            {productData.sizes.map((xs)=>(
              <div key={xs} onClick={()=>setSize(xs)} className={`border rounded w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-200 ${size===xs?'bg-black text-white':''}`}>{xs}</div>
            ))  
          }
          </div>
        </div>
        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-6 py-3 rounded hover:bg-gray-700 transition'>Add to Cart</button>
        
        
        <hr className='my-6'/>
        <div className='text-sm text-gray-600 space-y-2'>
          <p><span className='font-semibold'>100% Original:</span> Products are sourced from authorized stores only</p>
          <p><span className='font-semibold'>Quality Checked:</span> Each product is thoroughly checked before dispatch</p>
          <p><span className='font-semibold'>Best Price:</span> We offer the best prices on all products</p>
        </div>
        
      </div>
      
    </div>
    {/* toggle description and reviews */}
    <hr className='my-6'/>
    <div className='mb-10'>
      <div className='flex gap-6 border-b mb-6'>
        <p className='pb-2 cursor-pointer font-semibold border-b-2 border-black'>Description</p>
        <p className='pb-2 cursor-pointer text-gray-500'>Reviews (0)</p>
      </div>
      <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur. Morbi neque ex, condimentum dapibus congue et, vulputate ut ligula. Vestibulum sit amet urna turpis. Mauris euismod elit et nisi ultrices, ut faucibus orci tincidunt. Mauris et velit vitae ligula efficitur luctus. Proin in magna a ipsum viverra scelerisque. Pellentesque ac bibendum tortor, vel faucibus enim. Morbi nec quam nec dui venenatis eleifend. Ut non libero magna. Sed et quam lacus. Fusce condimentum eleifend enim a feugiat.</p>
    </div>
    {/* You may also like */}
    <div className='my-10'>
      
      {/* Rendering similar Products */}
      <RelatedProducts productData={productData}/>
    </div>
    </Fragment>
  ):(<div className='opacity-0'></div>
  )
}

export default Product
