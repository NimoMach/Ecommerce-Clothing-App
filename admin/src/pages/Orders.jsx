import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from '../App'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch user's orders
  const fetchOrders = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  const statusHandler=async(event,orderId)=>{
    try {
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchOrders()
      }
    } catch (error) {
      console.log(error)
      response.json({success:false,message:error.message})
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h1 className=" text-2xl text-gray-600 mb-3 font-bold">Orders Page</h1>
      <div className="gap-4">
        {
          orders.map((order, index) => (
            <div key={order._id || index} className="border rounded-lg shadow-md p-4 mb-3 sm:flex justify-between gap-4">
              <img src={assets.parcel_icon} alt="parcel" className="w-10 h-10" />
              <div className="flex flex-col">
                {order.items?.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity} <span className="text-gray-500">{item.size}</span>
                  </p>
                  
                )) || <p className="text-gray-500">No items found</p>}
                <p>{order.address.firstName+" "+order.address.lastName }</p>
              </div>
              <div>
                <p>{order.address.street+","}</p>  
                <p>{order.address.city+", "+order.address.state+","}</p>
                <p>{order.address.zipcode+", "+order.address.country}</p>
              </div>
              <div>
                <p>{order.address.phone}</p>
                <p>{order.address.email}</p>
              </div>
              <div>
                <p>Items:{order.items?.length||0}</p>
                <p>Method: {order.PaymentMethod}</p>
                <p>Payment: {order.payment?'Done':'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p>$ {order.amount}</p>
              </div>
              <div>
                <select onChange={(event)=>{statusHandler(event,order._id)}} value={order.status} className="p-2 font-semibold">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders;
