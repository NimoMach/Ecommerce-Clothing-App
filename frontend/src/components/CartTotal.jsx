import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'


const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount}=useContext(ShopContext);

  return (
    <div className='w-full  p-4 border rounded'>
      <div>
        <Title text1={'Cart'} text2={'Total'} />
        </div>
        <div className='mt-4'>
            <div className='flex justify-between mb-2'>
            <span className='font-medium'>Subtotal:</span>
            <span className='font-medium'>{currency}{getCartAmount()}</span>
            </div>
            <div className='flex justify-between mb-2'>
            <span className='font-medium'>Delivery Fee:</span>
                <span className='font-medium'>{currency}{delivery_fee}</span>
            </div>
            <hr className='my-2' />
            <div className='flex justify-between text-lg font-bold'>
                <span>Total:</span>
                <span>{currency}{getCartAmount()===0? 0:getCartAmount()+delivery_fee}</span>
            </div>
            
        </div>
    </div>
  )
}

export default CartTotal
