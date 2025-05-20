import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }
  useEffect(()=>{
    applyFilter();
  }, [category, subcategory, search, showSearch, products])
  useEffect(()=>{
    sortProduct();
  }, sortType)
  // ...existing code...
return (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t bg-gray-50 min-h-screen">
    {/* Filter options */}
    <aside className="min-w-60 w-full sm:w-64 bg-white rounded-lg shadow p-4 mb-4 sm:mb-0">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="w-full flex items-center justify-between text-lg font-semibold py-2 px-2 rounded hover:bg-gray-100 sm:cursor-default"
      >
        FILTERS
        <img
          className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
          src={assets.dropdown_icon}
          alt=""
        />
      </button>
      <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
        {/* Category Filter */}
        <div className="border-b border-gray-200 pb-4 mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleCategory} value={'Men'} /> Men
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleCategory} value={'Women'} /> Women
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleCategory} value={'Kids'} /> Kids
            </label>
          </div>
        </div>
        {/* Subcategory filters */}
        <div className="pt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleSubCategory} value={'Topwear'} /> Topwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} /> Bottomwear
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="accent-blue-600" type="checkbox" onChange={toggleSubCategory} value={'Winterwear'} /> Winterwear
            </label>
          </div>
        </div>
      </div>
    </aside>
    {/* Right side */}
    <main className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-base sm:text-2xl mb-6 gap-2">
        <Title text1={'ALL'} text2={'COLLECTIONS'} />
        {/* Product sort */}
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>
      {/* Map Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProducts.map((item, index) => (
          <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images} />
        ))}
      </div>
    </main>
  </div>
)
// ...existing code...
}

export default Collection;
