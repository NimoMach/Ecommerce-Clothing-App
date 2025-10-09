import axios from 'axios';
import React,{ useState } from 'react'
import { backendUrl } from '../App';
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleFormSubmission = async(event) => {
        try {
            event.preventDefault();
            const response=await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        
    }
    return (
            <div className='bg-white shadow-md rounded-lg px-8 py-6'>
                <h1 className='text-center mt-5 text-2xl font-bold '>Login to Admin Panel</h1>
                <form onSubmit={handleFormSubmission} className='w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 m-auto my-10 p-6 rounded'>
                    <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border p-2 rounded mb-4' type='email' placeholder='your@email.com' required />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border p-2 rounded mb-4' type='password' placeholder='Enter your password' required />
                    </div>
                    <button className='w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-700 transition' type='submit'>Login</button>
                </form>
            </div>
    )
}

export default Login
