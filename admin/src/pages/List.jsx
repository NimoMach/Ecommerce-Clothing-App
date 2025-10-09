import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const List = ({token}) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all products
  const fetchList = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${backendUrl}/api/product/list`)
      setList(data.products || [])
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>
  }

  if (list.length === 0) {
    return <p className="text-center mt-10">No products found.</p>
  }

  return (
    <>
      <div >
        <h1 className='text-2xl font-bold mb-4'>All Products Data</h1>
      </div>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Actions</b>
      </div>
      {/* Product list*/}
          {list.map((item) => (
            <div key={item._id} className="grid grid-cols-[1fr_3fr_1fr] sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center py-1 px-2 gap-2 text-sm">
              <img src={item.image[0]} alt="" className='w-12 h-12'/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='flex justify-center'><img onClick={()=>removeProduct(item._id)} src={assets.bin} alt="" className='w-5 h-5 cursor-pointer'/></p>
            </div>
          ))}
    </>
  )
}

export default List
