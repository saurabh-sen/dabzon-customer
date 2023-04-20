import React from "react";
import Image from "next/image";
import freeshipping from "../../../../public/icons/freeshipping.svg";
import bestprice from "../../../../public/icons/bestprice.svg";
import installation from "../../../../public/icons/installation.svg";
import creditcard from "../../../../public/icons/creditcard.svg";

const Index = () => {
  return (
    <div className="overflow-x-scroll my-8">
      <div className="flex justify-between my-4 max-w-7xl items-center mx-auto">
        <div>
          <div className="box-border mx-[1.6rem] border-gray-200 bg-gray-50  border h-16 w-60 flex items-center rounded-xl gap-3 px-6">
            <span className="p-2 rounded-full bg-dabgreen">
              <Image className="" loading="lazy" src={freeshipping} alt="Image is loading..." width={20} height={20} />
            </span>
            <div className="flex flex-col">
              <p className=" text-sm text-gray-700">FREE</p>
              <p className="  text-xs text-gray-700">shipping</p>
            </div>
          </div>
        </div>

        <div>
          <div className="box-border mx-[1.6rem] border-gray-200 bg-gray-50  border h-16 w-60 flex items-center rounded-xl gap-3 px-6">
            <span className="p-2 rounded-full bg-[#6366f1]">
              <Image className="" loading="lazy" src={bestprice} alt="Image is loading..." width={20} height={20} />
            </span>
            <div className="flex flex-col">
              <p className=" text-sm text-gray-700">PRIZE</p>
              <p className="  text-xs text-gray-700">best prize always</p>
            </div>
          </div>
        </div>

        <div>
          <div className="box-border mx-[1.6rem] border-gray-200 bg-gray-50  border h-16 w-60 flex items-center rounded-xl gap-3 px-6">
            <span className="p-2 rounded-full bg-[#f43f5e]">
              <Image className="" loading="lazy" src={installation} alt="Image is loading..." width={20} height={20} />
            </span>
            <div className="flex flex-col">
              <p className=" text-sm text-gray-700">FREE</p>
              <p className="  text-xs text-gray-700">installation</p>
            </div>
          </div>
        </div>

        <div>
          <div className="box-border mx-[1.6rem] border-gray-200 bg-gray-50  border h-16 w-60 flex items-center rounded-xl gap-3 px-6">
            <span className="p-2 rounded-full bg-[#f59e0b]">
              <Image className="" loading="lazy" src={creditcard} alt="Image is loading..." width={20} height={20} />
            </span>
            <div className="flex flex-col">
              <p className=" text-sm text-gray-700">CREDIT CARD</p>
              <p className="  text-xs text-gray-700">support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
