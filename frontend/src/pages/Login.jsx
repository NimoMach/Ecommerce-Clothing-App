import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

  const [currentState, setCurrentState] = useState('Login'); // login,register
  const { token, setToken, navigate, backendUrl, getUserCart } = useContext(ShopContext);

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      if (currentState === 'Register') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          const userToken = response.data.token;
          setToken(userToken);
          localStorage.setItem('token', userToken);
          toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          const userToken = response.data.token;
          setToken(userToken);
          localStorage.setItem('token', userToken);
          getUserCart(userToken);
        }
        else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={handleFormSubmission} className='w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 m-auto my-10 p-6 rounded'>
      <div className='text-center mb-6'>
        <p className='prata-regular text-3xl'>{currentState}</p>
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Username' className='w-full border p-2 rounded mb-4' />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='w-full border p-2 rounded mb-4' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='w-full border p-2 rounded mb-4' />

      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-600'>{currentState === 'Login' ? "Don't have an account?" : "Already have an account?"} <span onClick={() => setCurrentState(currentState === 'Login' ? 'Register' : 'Login')} className='text-blue-600 cursor-pointer hover:underline'>{currentState === 'Login' ? 'Register' : 'Login'}</span></p>
        {currentState === 'Login' ? <p className='text-sm text-gray-600 mb-4 text-right cursor-pointer hover:underline'>Forgot Password?</p> : ''}
      </div>
      <button type='submit' className='w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-700 transition'>{currentState}</button>
    </form>

  )
}

export default Login
