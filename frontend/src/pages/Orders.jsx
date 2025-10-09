import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  // Fetch user's orders
  const fetchOrders = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['PaymentMethod'] = order.PaymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrders(allOrdersItem.reverse())
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-[80vh] py-10 px-4 sm:px-8">
      <Title text1="Your" text2="Orders" />
      <p className="text-gray-600 mt-2 mb-6 w-3/4 m-auto text-xs sm:text-sm md-text-base text-center">
        Track and manage all your orders in one place
      </p>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex flex-row items-center justify-between border-b pb-3 last:border-none mb-3 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.image[0]} alt={item.name} className="w-20 h-20 rounded object-cover" />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">{currency}{item.price * item.quantity}</p>
                </div>
              </div>
              <div>
                <p>{item.status}</p>
              </div>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Orders;
