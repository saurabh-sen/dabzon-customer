import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid'
import Genral_Dropdown from './Dropdown'
import React from 'react'
import { useEffect } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function index({filteredItems, setFilters, resetFilters, applyFilters}) {

    const [brandData, setBrandData] = React.useState([]);
    const [categoryData, setCategoryData ] = React.useState([]);
    // const warrantyData = ['0-1year', '1-2years', '2-3years'];

    useEffect(() => {
        setBrandData(filteredItems.map((item) => item.productBrand).filter((value, index, self) => self.indexOf(value) === index));
        setCategoryData(filteredItems.map((item, idx) => item.productCategory).filter((value, index, self) => self.indexOf(value) === index));
    }, [filteredItems]);

    return (
        <Menu as="div" className="relative inline-block text-left mr-4">
            <div>
                <Menu.Button className="login border border-gray-600  font-semibold hover:text-gray-600 focus:text-gray-600 px-3 py-1 sm:px-6 sm:py-2 rounded-full flex items-center gap-3 text-gray-600 text-sm">
                    <AdjustmentsHorizontalIcon className="h-3 w-3 sm:h-5 sm:w-5" />
                    <span className="filter__icon">Filter</span>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-auto md:right-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-3">

                        <Menu.Items>
                            <Genral_Dropdown setFilters={setFilters} optionArray={brandData} heading='Brand' />
                        </Menu.Items>
                        {/* <Menu.Items>
                            <Genral_Dropdown setFilters={setFilters} optionArray={warrantyData} heading='Warranty' />
                        </Menu.Items> */}
                        <Menu.Items>
                            <Genral_Dropdown setFilters={setFilters} optionArray={categoryData} heading='Category' />
                        </Menu.Items>
                        <Menu.Items>
                            <div className='flex justify-between'>
                                <button onClick={() => resetFilters()} className="reset border border-red-500 -500 font-semibold text-red-500 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white px-6 py-2 my-4 rounded-full">Reset</button>
                                <button onClick={() => applyFilters()} className="apply border border-dabgreen text-dabgreen hover:bg-dabgreen hover:text-white focus:bg-dabgreen focus:text-white font-semibold bg-white px-6 py-2 my-4 rounded-full">Apply</button>
                            </div>
                        </Menu.Items>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
