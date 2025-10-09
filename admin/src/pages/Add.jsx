import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [sizes, setSizes] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [category, setCategory] = useState('Women')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [bestseller, setBestseller] = useState(false)

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    // Function to handle image uploads dynamically
    const handleImageChange = (event, setImage) => {
        const file = event.target.files[0]
        if (file) setImage(file)
    }

    // Toggle product sizes
    const handleSizeChange = (size) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        )
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const formData = new FormData()
            if (image1) formData.append('image1', image1)
            if (image2) formData.append('image2', image2)
            if (image3) formData.append('image3', image3)
            if (image4) formData.append('image4', image4)

            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('rating', rating)
            formData.append('category', category)
            formData.append('subCategory', subCategory)
            formData.append('sizes', JSON.stringify(sizes))
            formData.append('bestSeller', bestseller)


            // Now send this formData to backend with fetch/axios
            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
            if(response.data.success){
                toast.success(response.data.message)
                setBestseller(false)
                setCategory('Women')
                setSubCategory('Topwear')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setName('')
                setPrice('')
                setRating('')
                setSizes([])
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
        <form
            onSubmit={handleSubmit}
            className='flex flex-col w-full items-start gap-5'
        >
            <h1 className=" text-2xl text-gray-600 mb-3 font-bold">Add Product Details</h1>
            {/* Upload Product Images */}
            <div>
                <p className='mb-2'>Upload Product Images</p>
                <div className='flex gap-5'>
                    {[
                        { id: 'image1', image: image1, setter: setImage1 },
                        { id: 'image2', image: image2, setter: setImage2 },
                        { id: 'image3', image: image3, setter: setImage3 },
                        { id: 'image4', image: image4, setter: setImage4 },
                    ].map(({ id, image, setter }) => (
                        <label key={id} htmlFor={id}>
                            <img
                                className='w-20 h-20 cursor-pointer rounded border'
                                src={!image ? assets.upload_icon : URL.createObjectURL(image)}
                                alt=''
                            />
                            <input
                                type='file'
                                id={id}
                                hidden
                                onChange={(e) => handleImageChange(e, setter)}
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Name */}
            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full max-w-[500px] px-3 py-2 border rounded'
                    placeholder='type here'
                    type='text'
                    required
                />
            </div>

            {/* Product Description */}
            <div className='w-full'>
                <p className='mb-2'>Product Description</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-full max-w-[500px] px-3 py-2 border rounded'
                    placeholder='type description here'
                    required
                />
            </div>

            {/* Category & Pricing */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product Category</p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-3 py-2 border rounded'
                    >
                        <option value='Women'>Women</option>
                        <option value='Men'>Men</option>
                        <option value='Kids'>Kids</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Sub-Category</p>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className='w-full px-3 py-2 border rounded'
                    >
                        <option value='Topwear'>Topwear</option>
                        <option value='Bottomwear'>Bottomwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='w-full px-3 py-2 sm:w-[120px] border rounded'
                        type='number'
                        required
                        placeholder='10'
                    />
                </div>

                <div>
                    <p className='mb-2'>Product Rating</p>
                    <input
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className='w-full px-3 py-2 sm:w-[120px] border rounded'
                        type='number'
                        required
                        placeholder='5'
                    />
                </div>
            </div>

            {/* Product Sizes */}
            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3 flex-wrap'>
                    {availableSizes.map((size) => (
                        <p
                            key={size}
                            onClick={() => handleSizeChange(size)}
                            className={`px-3 py-1 cursor-pointer rounded border transition ${sizes.includes(size)
                                    ? 'bg-black text-white border-black'
                                    : 'bg-gray-300 text-black border-gray-400'
                                }`}
                        >
                            {size}
                        </p>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <div className='flex gap-3 mt-2 mb-2'>
                <input
                    type='checkbox'
                    id='bestseller'
                    checked={bestseller}
                    onChange={(e) => setBestseller(e.target.checked)}
                />
                <label className='cursor-pointer' htmlFor='bestseller'>
                    Add to Best Seller
                </label>
            </div>

            {/* Submit Button */}
            <button
                className='w-28 py-2 mt-4 bg-black text-white rounded'
                type='submit'
            >
                ADD
            </button>
        </form>
    )
}

export default Add
