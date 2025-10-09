import React  from "react";
import { assets } from "../assets/assets";

const Hero = () => {
    return (
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 sm:gap-0 mt-10">
            <div className="flex flex-col gap-6 sm:w-1/2">
                <h1 className="prata-regular text-4xl sm:text-5xl font-bold leading-tight">Discover, Shop, and Save with I-Shop</h1>          
                <p className="text-gray-600">Your one-stop shop for the latest trends and unbeatable deals. Explore our wide range of products and enjoy a seamless shopping experience.</p>
                <button className="bg-black text-white w-40 py-2 rounded-full hover:bg-gray-800 transition-all">Shop Now</button>
            </div>
            <div className="sm:w-1/2">
                <img src={assets.banner} alt="hero_image" className="w-full"/>
            </div>
        </div>
    )
}

export default Hero