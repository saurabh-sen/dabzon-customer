import React from 'react'
import CategoryCard from '../../ShopByCategory/CategoryCard/index'

const Index = () => {

  // fetch data from api and remove the hard coded data
  let data=[
      {"title":"Car Batteries"},
      {"title":"Bike Batteries"},
      {"title":"Bike Batteries"},
      {"title":"Bike Batteries"},
      {"title":"Bike Batteries"},
      {"title":"Bike Btteries"},
      {"title":"Heavy Engine Batteries"},
      {"title":"Inverter Batteries"},
      {"title":"Roller Batteries"},
      {"title":" Batteries"},
  ]

  return (
    <div className='all__categories my-8'>
      <div className='all__categories__container max-w-7xl mx-auto px-[3vw]'>
        <div className="flex justify-between">
          <p className="text-gray-900 text-xl sm:text-2xl font-bold">All Category</p>
        </div>
        <div className="flex flex-wrap">
          {data.map((item, index) => {
            return <CategoryCard key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  )
}

export default Index