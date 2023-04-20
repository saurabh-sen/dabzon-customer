import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { useRouter } from 'next/router';
import capacity from '../../../../public/icons/capacity.svg'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Index({ productState, capacityArray }) {

    const router = useRouter();
    // console.log("capacityArray ", capacityArray)
    return (
        <Menu as="div" className="capacity__drop__down relative bg-gray-50 border border-[#14b8a6] hover:text-[#14b8a6] focus:text-[#14b8a6] px-4 py-2 rounded-xl flex items-center gap-3 text-[#14b8a6] ">
            <Menu.Button className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-[#14b8a6]">
                    <Image className="" loading="lazy" src={capacity} alt="Image is loading..." width={20} height={20} />
                </span>
                <div className="flex flex-col text-sm">
                    <p className="">capacity</p>
                    <p className="">{productState.productCapacity}</p>
                </div>
                <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute top-16 left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            capacityArray.length !== 0
                                ? capacityArray.map((item, index) => <Menu.Item key={index} onClick={() => router.push(`/product/${item.productId}`)}>
                                    {({ active }) => (
                                        <p className={classNames(
                                            active ? 'cursor-pointer text-dabgreen' : 'text-gray-800',
                                            'block px-4 py-2 text-base'
                                        )}
                                        >
                                            {item.capacity}
                                        </p>
                                    )}
                                </Menu.Item>
                                )
                                : null
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
