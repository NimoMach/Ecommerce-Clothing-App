import React, { useState, useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, cartItems, setCartItems, getCartAmount, delivery_fee, products, token } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            toast.success('Payment Success')
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'stripe':
          setCartItems({});
          toast.success('Payment Success')
          navigate('/orders')
          break;
        case 'razorpay':
          setCartItems({});
          toast.success('Payment Success')
          navigate('/orders')
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmission}
      className="flex flex-col sm:flex-row gap-5 pt-5 sm:pt-10 border-t min-h-[70vh] px-4 sm:px-8"
    >
      {/* Shipping Form */}
      <div className="flex-1 gap-2 sm:mr-5">
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="w-full border p-2 rounded mb-2 text-sm sm:text-base"
        />
        <input
          required
          onChange={onChangeHandler}
          name="city"
          value={formData.city}
          type="text"
          placeholder="City"
          className="w-full border p-2 rounded mb-2 text-sm sm:text-base"
        />
        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="text"
            placeholder="Zip Code"
            className="w-full sm:w-1/2 border p-2 rounded text-sm sm:text-base"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="country"
          value={formData.country}
          type="text"
          placeholder="Country"
          className="w-full border p-2 rounded mb-2 text-sm sm:text-base"
        />
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2 text-sm sm:text-base"
        />
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-2 rounded mb-2 text-sm sm:text-base"
        />
      </div>

      {/* Right Section - Order Summary + Payment + Button */}
      <div className="flex-1 flex flex-col justify-between mt-5 sm:mt-0">
        <div>
          <Title text1={'Order'} text2={'Summary'} />
          <p className="text-gray-600 mt-2 w-full sm:w-3/4 text-xs sm:text-sm md:text-base">
            Review your order before proceeding to payment
          </p>

          <CartTotal />
          <br />

          <Title text1={'Payment'} text2={'Details'} />
          <br />
          <p className="text-gray-600 mt-2 w-full sm:w-3/4 text-xs sm:text-sm md:text-base">
            Select your payment method
          </p>

          <div className="p-3 sm:p-4 rounded flex flex-col sm:flex-row gap-3 mt-4 font-bold text-2xl">
            {/* Stripe Option */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={method === 'stripe'}
                onChange={() => setMethod('stripe')}
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-gray-600 text-sm sm:text-base font-medium">Stripe</span>
            </label>

            {/* Razorpay Option */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={method === 'razorpay'}
                onChange={() => setMethod('razorpay')}
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-gray-600 text-sm sm:text-base font-medium">Razorpay</span>
            </label>

            {/* COD Option */}
            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 transition">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={method === 'cod'}
                onChange={() => setMethod('cod')}
                className="accent-green-500 w-4 h-4"
              />
              <span className="text-gray-600 text-sm sm:text-base font-medium mx-2">
                Cash on Delivery
              </span>
            </label>
          </div>
        </div>

        {/* Place Order Button (inside form) */}
        <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
          <button
            type="submit"
            className="bg-black text-white w-full sm:w-auto px-6 py-2 rounded hover:bg-gray-700 transition text-sm sm:text-base"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
