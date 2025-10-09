import React,{ use, useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
    const [visible,setVisible]=useState(false);
    const location=useLocation();

    // Hide search bar when not on home or collection page
    useEffect(() => {
        if ( location.pathname.includes('/collection'))  {
            setVisible(true)
        }
        else{
            setVisible(false);
        }
    },[location]);


  return showSearch && visible ? (
    <div className='my-4 relative'>
      <input 
        type='text' 
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder='Search products...' 
        className='w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black'
        />
        <button onClick={()=>{setShowSearch(false); setSearch('')}} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded'>X</button>
    </div>
  ) : null
}

export default SearchBar
