import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard/index";
const Index = ({ data }) => {
  const [showdata, setShowData] = useState([]);
  useEffect(() => {
    setShowData(data)
  }, [data]);
  return (
    <div className="bg-gray-100 my-8 ">
      <div className="shopbycategory__container max-w-7xl mx-auto px-[3vw]">
        <div className="flex justify-between">
          <p className="text-gray-900 text-xl sm:text-2xl font-bold">Shop by Category</p>
          <Link href='/all/allCategories' className="text-dabgreen font-medium text-sm">view all</Link>
        </div>
        <div className="flex overflow-x-scroll">
          {
            showdata.length !== 0 ? showdata?.map((item, index) => {
              return <CategoryCard key={index} item={item} />;
            }) :
            <div className="loader__shopbycategory mx-auto ">
              <svg className="animate-spin h-24 w-24 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          }
        </div>
      </div>
    </div>
  );

};

export default Index;
