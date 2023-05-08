import React from 'react'
import Image from 'next/image'
import monogram from '../../../../../public/monogram.png'
import { useRouter } from 'next/router';

const Index = ({ item }) => {

  const router = useRouter();

  return (
    <div className='flex cursor-pointer' onClick={() => router.push(`/user/category/${item.title}`)} >
      <div className='hover:shadow-[0px_20px_25px_-5px_rgb(0,0,0,0.1),0px_10px_10px_-5px_rgb(0,0,0,0.4)] hover: active:border-dabgreen  border-gray-200 bg-gray-50  border-[1px] m-4 h-32 w-32 sm:h-48 sm:w-48 flex items-center flex-col justify-center rounded-xl'>
        <Image className='m-1 sm:m-2  h-10 w-10 sm:h-16 sm:w-16'
          loading='lazy'
          src={item.image ? item.image : monogram}
          alt="Image is loading..."
          width={70}
          height={70}
        />
        <p className='m-1 text-center sm:m-2  text-sm' >{item.title}</p>
      </div>
    </div>
  )
}

export default Index