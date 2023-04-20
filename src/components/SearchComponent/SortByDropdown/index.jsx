import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({setSort}) {

    let sortByData = ["Low to high", "High to low", "Popularity"]

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="login border border-gray-600  font-semibold hover:text-gray-600 focus:text-gray-600  rounded-full flex items-center gap-3 text-gray-600 px-3 py-1 sm:px-6 sm:py-2 text-sm">
                    <ChevronDownIcon className="-mr-1 h-3 w-3 sm:h-5 sm:w-5" aria-hidden="true" />
                    <span className="filter__icon">Sort By</span>
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            sortByData.map((item, index) => <Menu.Item key={index} onClick={() => setSort(prev => prev = item) } >
                                {({ active }) => (
                                    <p className={classNames(
                                            active ? 'cursor-pointer text-dabgreen' : 'text-gray-800',
                                            'block px-4 py-2 text-base'
                                        )}
                                    >
                                        {item}
                                    </p>
                                )}
                            </Menu.Item>
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
