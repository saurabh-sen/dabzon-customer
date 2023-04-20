import React, { useEffect, useState } from "react";
import Link from "next/link";
import BrandCard from "../ShopByBrand/BrandCard/index";

const Index = () => {

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch('/api/landingpage/brands')
      .then((res) => res.json())
      .then((res) => {
        setBrands(res.allData);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(brands);

  return (
    <div className="shopbybrand my-8 ">
      <div className="max-w-7xl mx-auto px-[3vw]">
        <div className="flex justify-between ">
          <p className="text-gray-900 text-xl sm:text-2xl font-bold">Shop by Brand</p>
          <Link href='/all/allBrands' className="text-dabgreen font-medium text-sm">view all</Link>
        </div>
        <div className=" customScroll flex overflow-x-scroll">

          {
            brands.length !== 0 ? brands.map((brand, index) => <BrandCard key={index} brand={brand} />)
              : <div className="loader__shopbycategory mx-auto ">
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
