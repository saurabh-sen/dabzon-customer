import React from 'react'
import profile from '../../../../public/avatar.png'
import order from '../../../../public/account/order.svg'
import address from '../../../../public/account/address.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { deleteCookie } from '../../../cookie/index'

// how to export default arrow functions in nextjs
export default function AccountNav({ setRight, right, profileData }){
  const handleSignOut = () => {
    signOut();
    deleteCookie("userSession");
  }
  return (
    <div className='flex flex-col items-center sm:items-start'>
      <div onClick={() => setRight(1)} className={` cursor-pointer box-border border-gray-200 ${right === 1 ? 'bg-[#d1fae5]' : 'bg-white'} border h-16 lg:w-72 w-56 flex items-center rounded-lg m-2`}>
        <div className='w-10 h-10  mx-4'>
          <Image
            className=" w-10 h-10 rounded-full object-cover"
            loading="lazy"
            src={profileData.image ? profileData.image : profile}
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-lg  text-green-900">Hello !!</p>
          <p className="  text-xs  text-green-800">{profileData.name}</p>
        </div>
      </div>



      <div onClick={() => setRight(2)} className={` cursor-pointer box-border border-gray-200 ${right === 2 ? 'bg-[#d1fae5]' : 'bg-white'} border h-16 lg:w-72 w-56 flex items-center rounded-lg m-2`}>
        <div className='w-10 h-10 mx-4'>

          <Image
            className=" w-10 h-10 "
            loading="lazy"
            src={order}
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-lg text-green-900">MY Order</p>
          <p className="  text-xs text-green-800">20+ order till Today</p>
        </div>
      </div>



      <div onClick={() => setRight(3)} className={` cursor-pointer box-border border-gray-200 ${right === 3 ? 'bg-[#d1fae5]' : 'bg-white'} border h-16 lg:w-72 w-56 flex items-center rounded-lg m-2`}>
        <div className='w-10 h-10 mx-4'>

          <Image
            className=" w-10 h-10 "
            loading="lazy"
            src={address}
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-lg text-green-900">Saved Address</p>
          <p className="  text-xs text-green-800">2+ Address Saved</p>
        </div>
      </div>



      <div onClick={() => setRight(4)} className={` cursor-pointer box-border border-gray-200 ${right === 4 ? 'bg-[#d1fae5]' : 'bg-white'} border h-16 lg:w-72 w-56 flex items-center rounded-lg m-2`}>
        <div className='w-10 h-10 mx-4'>

          <Image
            className=" w-10 h-10"
            loading="lazy"
            src={address}
            alt="Image is loading..."
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-lg text-green-900">My Stuff</p>
          <p className="  text-xs text-green-800">2+ Address Saved</p>
        </div>
      </div>
      <button onClick={() => handleSignOut()} className='bg-red-200 lg:w-72 w-56 h-10  my-2 rounded-[100px] mx-2'>Log Out</button>
    </div>
  )
}