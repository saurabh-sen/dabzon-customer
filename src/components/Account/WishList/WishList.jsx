import React from 'react'
import Image from "next/image";
import myorder from "../../../../public/account/myorder.svg";
import filterBut from "../../../../public/account/button.svg";
import without_exchange from "../../../../public/account/without_exchange.svg";
import with_trolley from "../../../../public/account/with_trolley.svg";

export default function WishList({setRight}) {
    return (
        <div className="flex flex-col border-2 bg-white rounded-xl px-2 md:p-6 mb-20 sm:mb-0 w-full">
            {/* .................................search and filter start........................... */}
            <button className="block md:hidden" onClick={() => setRight(9)}>
                {/* go back svg */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
            <div className="flex justify-center md:justify-between flex-wrap gap-3">
                <button className="group search__container md:flex flex flex-row gap-3 bg-[#f3f4f6] rounded-3xl px-4 py-1 sm:py-2  items-center relative">
                    <svg
                        className="sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray-900"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <input
                        className="border-0 outline-0 bg-transparent text-sm text-gray-900"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search your order here"
                    />
                    <div
                        className="recent_search_and__search__results bg-white rounded-md shadow-md absolute top-[70px] left-0 hidden group-focus-within:block w-full z-20"
                        autoComplete="off"
                    ></div>
                </button>
                <Image
                    className="w-20 md:w-28 h-auto "
                    loading="lazy"
                    src={filterBut}
                    alt="Image is loading..."
                    width={1000}
                    height={1000}
                />
            </div>
            {/* .................................search and filter end......................... */}

            {/* .................................first item start..................... */}
            <div className="  flex mt-4 bg-gray-100 rounded-xl justify-between flex-wrap md:flex-nowrap">
                <div className="flex  w-full gap-1 md:gap-3">
                    <Image
                        className="Left___most___image w-16 h-16 md:h-40 md:w-auto"
                        loading="lazy"
                        src={myorder}
                        alt="Image is loading..."
                        width={1000}
                        height={1000}
                    />

                    <div className="flex flex-col space-y-1 md:space-y-2 justify-center m-2">
                        <p className="truncate text-xs text-gray-900 font-medium w-40 break-words">
                            WISHLIST GOES HERE
                        </p>
                        <p className="text-dabgreen text-base md:text-xl font-semibold ">₹20.00</p>
                        <div className="flex">
                            <Image
                                className="h-7 w-auto"
                                loading="lazy"
                                src={without_exchange}
                                alt="Image is loading..."
                                width={1000}
                                height={1000}
                            />
                            <p className="flex text-gray-900 text-xs md:text-sm items-center ml-1 md:ml-2">
                                WITH TROLLEY
                            </p>
                        </div>
                        <div className="flex">
                            <Image
                                className="h-7 w-auto"
                                loading="lazy"
                                src={with_trolley}
                                alt="Image is loading..."
                                width={1000}
                                height={1000}
                            />
                            <p className="flex text-gray-900 text-xs md:text-sm items-center ml-1 md:ml-2">
                                WITHOUT TROLLEY
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 justify-center m-2">
                    <p className="text-sm text-dabgreen">Delivered on sun Mar 26</p>
                    <p className="text-xs text-gray-900">Your Item has been delivered</p>
                    <p className="tex-sm text-dabgreen">Rate</p>
                    <div className="">
                        <button className="text-xs text-gray-50 h-11 w-36  bg-dabgreen rounded-full mt-3">
                            View details
                        </button>
                    </div>
                </div>
            </div>
            {/* ................................................................................................................... */}
        </div>
    )
};