import Link from 'next/link'
import React from 'react'
import TopSellingBatteriesCard from '../../../src/components/LandingPageComponents/TopSellingBatteries/TopSellingBatteriesCard/index'

const Index = ({ data, subcategory }) => {

  return (
    <div className='topsellingbatteries my-8'>
      <div className="topsellingbatteries__container max-w-7xl mx-auto px-[3vw]">
        <div className="flex justify-between ">
          <p className="text-gray-900 text-xl sm:text-2xl font-bold">{subcategory}</p>
          <Link href='/all/topSellingProducts' className="text-dabgreen font-medium text-sm">view all</Link>
        </div>
        <div className='flex flex-wrap justify-center gap-6 my-4'>
          {
            data > 0 ?
              data.map((item, idx) => <TopSellingBatteriesCard key={idx} item={item} />)
              :
              <svg className="animate-spin h-24 w-24 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.CUSTOMER_HOST}/api/subcategory/get?category=${context.query.category}&subcategory=${context.query.subcategory}`);
    const resJSON = await res.json();
    return {
        props: {
            data: resJSON.allData,subcategory: context.query.subcategory
        }
    }
  }