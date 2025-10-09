import React, { useContext, useState, useEffect, Fragment } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, setCartItems, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Build a simpler cart data array without totalPrice
  useEffect(() => {
    let data = [];
    if (products.length > 0) {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          try {
            if (cartItems[itemId][size] > 0) {
              data.push({
                _id: itemId,
                size,
                quantity: cartItems[itemId][size]
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    setCartData(data);
  }, [cartItems, products]);

  // Helper function to calculate total per item
  const getItemTotal = (itemId, quantity) => {
    const product = products.find(p => p._id === itemId);
    if (!product) return 0;
    return product.price * quantity;
  }

  return (
    <div className='min-h-[80vh] container mx-auto px-2 lg:px-0 py-10'>
      <Title text1='Your' text2='Cart' />
      {cartData.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-64'>
          <p className='text-lg text-center mb-20'>Your cart is empty</p>
          <Link to={'/collection'} className='bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition mr-4'>
            Continue Shopping
          </Link>
        </div>

      ) : (
        <Fragment>
          {/* Cart Items List */}
          <div className='overflow-x-auto'>
            {cartData.map((item, index) => {
              const product = products.find(p => p._id === item._id);

              return (
                <div key={index} className='flex flex-col lg:flex-row items-center border-b py-4'>
                  <div className='w-24 h-24 flex-shrink-0'>
                    <img src={product.image[0]} alt={product.name} className='w-full h-full object-contain' />
                  </div>
                  <div className='flex-1 ml-8'>
                    <h3 className='text-lg font-medium'>{product.name}</h3>
                    <p className='text-gray-600'>Size: {item.size}</p>
                    <p className='text-gray-600'>Price: {currency}{product.price}</p>
                    <div className='mt-2 flex items-center'>
                      <label htmlFor={`quantity-${index}`} className='mr-2'>Quantity:</label>
                      <input 
                        type='number' 
                        id={`quantity-${index}`} 
                        min='1' 
                        value={item.quantity} 
                        onChange={(e) => e.target.value===''||e.target.value==='0'?null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                        className='w-16 border rounded px-2 py-1' 
                      />
                    </div>
                  </div>

                  <div className='mt-4 lg:mt-0 lg:ml-4 flex flex-col justify-between'>
                    <p className='text-lg font-medium'>
                      Total: {currency}{getItemTotal(item._id, item.quantity)}
                    </p>
                    <img 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      src={assets.bin} 
                      alt="delete" 
                      className='h-6 cursor-pointer' 
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total and Actions */}
          <div className='flex justify-end mt-6'>
            <CartTotal />
          </div>

          {/* Sholling and Checkout */}
          

          <div className='flex flex-col lg:flex-row justify-between items-center mt-6'>
            <div className='mt-4 text-right'>
              <Link to={'/collection'} className='bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition mr-4'>
                Continue Shopping
              </Link>
            </div>
            <div className='mt-4 text-right'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white px-6 py-2 rounded hover:bg-gray-700 transition'>
              Proceed to Checkout
            </button>
          </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Cart;
