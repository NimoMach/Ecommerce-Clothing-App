import React, {useContext,useEffect,useState} from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'Latest'} text2={'Collections'} />
        <p className='text-gray-600 mt-2 w-3/4 m-auto text-xs sm:text-sm md-text-base'>Check out our latest products</p>
      </div>
      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {latestProducts.map((item)=>(
            <div key={item.id} className='text-gray-700 cursor-pointer'>
              <ProductItem id={item._id} name={item.name} image={item.image[0]} price={item.price} />
            </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
