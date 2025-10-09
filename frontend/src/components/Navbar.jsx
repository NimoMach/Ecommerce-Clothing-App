import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
    const [visible, setVisible] = React.useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})

    }

    return (
        <div className='flex justify-between items-center py-4'>
            <Link to='/'><h1 className='font-bold text-2xl'>I-Shop</h1></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-900'>
                <NavLink to='/'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
                </NavLink>
                <NavLink to='/collection'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search} alt="search" className='w-6 cursor-pointer' />

                <div className='relative group'>
                    <img onClick={() => token ? null : navigate('/login')} className='w-6 cursor-pointer' src={assets.user} alt='user_icon' />
                    {/* Dropdown menu */}
                    {
                        token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>LogOut</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart} alt="cart" className='w-6 min-w-5 cursor-pointer' />
                    <div className='absolute -top-2 -right-2 bg-black text-white w-4 h-4 rounded-full text-[10px] flex justify-center items-center'>{getCartCount()}</div>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            </div>
            {/* Mobile Menu - side bar */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-700'>
                    <div onClick={() => setVisible(false)} className='flex items-center cursor-pointer gap-3 p-4'>
                        <img src={assets.log_out} alt="close" className='w-5 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 ' to='/' >Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 ' to='/collection' >Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 ' to='/about' >About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 ' to='/contact' >Contact</NavLink>

                </div>

            </div>
        </div>
    )
}

export default Navbar
