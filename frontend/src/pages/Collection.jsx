import React,{useState,useContext, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    prices: [],
    subCategories: [],
    sizes: []
  })
  const [sortBy, setSortBy] = useState('newest')


  const toggleShowFilters=()=>{
    setShowFilters(!showFilters);
  }

  // Apply filters & sorting whenever any dependency changes
  useEffect(() => {
    let updatedProducts = [...products]

    // 1 Category filter
    if (selectedFilters.categories.length > 0) {
      updatedProducts = updatedProducts.filter(p =>
        selectedFilters.categories.includes(p.category)
      )
    }

    // 2 Sub-category filter
    if (selectedFilters.subCategories.length > 0) {
      updatedProducts = updatedProducts.filter(p =>
        selectedFilters.subCategories.includes(p.subCategory)
      )
    }

    // 3 Size filter (assuming product.sizes is array)
    if (selectedFilters.sizes.length > 0) {
      updatedProducts = updatedProducts.filter(p =>
        p.sizes?.some(size => selectedFilters.sizes.includes(size))
      )
    }

    // 4 Price range filter
    if (selectedFilters.prices.length > 0) {
      updatedProducts = updatedProducts.filter(p => {
        return selectedFilters.prices.some(range => {
          if (range === '0-50') return p.price >= 0 && p.price <= 50
          if (range === '51-100') return p.price > 50 && p.price <= 100
          if (range === '101-200') return p.price > 100 && p.price <= 200
          return true
        })
      })
    }

    // 5 Sort logic
    if (sortBy === 'priceLowToHigh') {
      updatedProducts.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'priceHighToLow') {
      updatedProducts.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      updatedProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // 6. Apply search filter
    if (showSearch && search.trim() !== '') {
      const searchLower = search.toLowerCase()
      updatedProducts = updatedProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.subCategory.toLowerCase().includes(searchLower)
      )
    }

    setFilteredProducts(updatedProducts)
  }, [products, selectedFilters, sortBy, search, showSearch])

  // Generic filter handler
  const handleFilterChange = (type, value) => {

    setSelectedFilters(prev => {
      const alreadySelected = prev[type].includes(value)
      const updatedValues = alreadySelected
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
      return { ...prev, [type]: updatedValues }
    })
  }


  return (
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-10 pt-10 border-t">
          {/* ---------- FILTERS ---------- */}
          <div className="w-full sm:w-1/4 flex flex-col gap-4">
            <h2 onClick={toggleShowFilters} className="font-bold text-lg cursor-pointer">
              Filters
            </h2>

        <div className={`sm:block ${showFilters ? 'block' : 'hidden'} flex flex-col gap-6`}>
          {/* Category */}
          <div>
            <h3 className="font-semibold">Category</h3>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className="block">
                <input
                  type="checkbox"
                  value={cat}
                  onChange={() => handleFilterChange('categories', cat)}
                  checked={selectedFilters.categories.includes(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold">Price Range</h3>
            {[
              { label: '$0 - $50', value: '0-50' },
              { label: '$51 - $100', value: '51-100' },
              { label: '$101 - $200', value: '101-200' }
            ].map(p => (
              <label key={p.value} className="block">
                <input
                  type="checkbox"
                  value={p.value}
                  onChange={() => handleFilterChange('prices', p.value)}
                  checked={selectedFilters.prices.includes(p.value)}
                  className="mr-2"
                />
                {p.label}
              </label>
            ))}
          </div>

          {/* Sub-category */}
          <div>
            <h3 className="font-semibold">Sub-Category</h3>
            {['Topwear', 'Bottomwear'].map(sub => (
              <label key={sub} className="block">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={() => handleFilterChange('subCategories', sub)}
                  checked={selectedFilters.subCategories.includes(sub)}
                  className="mr-2"
                />
                {sub}
              </label>
            ))}
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold">Size</h3>
            {['XS','S', 'M', 'L', 'XL','XXL'].map(size => (
              <label key={size} className="block">
                <input
                  type="checkbox"
                  value={size}
                  onChange={() => handleFilterChange('sizes', size)}
                  checked={selectedFilters.sizes.includes(size)}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- PRODUCTS ---------- */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <Title text1="All" text2="Collection" />
          <div>
            <label htmlFor="sort" className="mr-2 font-semibold">
              Sort By:
            </label>
            <select
              id="sort"
              name="sort"
              className="border border-gray-300 rounded p-2"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <div key={item._id} className="text-gray-700 cursor-pointer">
                <ProductItem id={item._id} name={item.name} image={item.image[0]} price={item.price} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found</p>
          )}
        </div>
      </div>
          </div>

    
  )
}

export default Collection
