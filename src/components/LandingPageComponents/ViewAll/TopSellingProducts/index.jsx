import React from 'react'
import { useEffect } from 'react'
import TopSellingBatteriesCard from '../../TopSellingBatteries/TopSellingBatteriesCard/index'

const Index = () => {

  const [topSellingProducts, setTopSellingProducts] = React.useState([]);

  useEffect(() => {
    fetch('/api/product/alltopsellingproducts')
      .then((response) => response.json())
      .then((data) => setTopSellingProducts(data.data));
  }, []);

  return (
    <div className='topsellingbatteries my-8'>
      <div className="topsellingbatteries__container max-w-7xl mx-auto px-[3vw] min-h-[70vh]">
        <div className="flex justify-between ">
          <p className="text-gray-900 text-xl sm:text-2xl font-bold">All Best Selling Products</p>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-6 my-4'>
          {
            topSellingProducts.length > 0
              ? topSellingProducts.map((item, idx) => <TopSellingBatteriesCard key={idx} item={item} />)
              : <svg className="animate-spin h-24 w-24 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
          }
        </div>
      </div>
    </div>
  )
}

export default Index