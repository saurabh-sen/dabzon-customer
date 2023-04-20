import Image from 'next/image'
import React from 'react'
import payment__success__bg from "../../../../../public/payment_success.svg"

const Index = ({orderId, closePaymentSuccessModal}) => {
  return (
    <div className='payment__success bg-[#064e3b] text-white rounded-md my-20'>
      <div className="payment__success__container max-w-sm mx-auto py-14 flex flex-col items-center space-y-3">
        <div onClick={() => closePaymentSuccessModal()} className="container__close absolute top-0 right-0 p-4 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="container__icon bg-white rounded-full p-4">
          <Image src={payment__success__bg} alt="payment__success" width={100} height={100} className='' />
        </div>
        <p className="container__text font-semibold text-xl">Congratulations</p>
        <p className="container__desc">Your order has been successfully placed</p>
        <p className="container__order__id space-x-5">
          <span className="order__id__text">Order ID</span> 
          <span className="order__id">{orderId}</span>
          </p>
        <div className="container__buttons flex gap-3 flex-col !my-8 flex-wrap justify-center items-center ">
          <button className="invoice border-white border-2 rounded-3xl px-5 py-2 hover:text-dabgreen hover:bg-gray-300">Download Invoice</button>
          <button className="order__status border-white border-2 rounded-3xl px-5 py-2 hover:text-dabgreen hover:bg-gray-300">Go to profile to Check Order Status</button>
        </div>
      </div>
    </div>
  )
}

export default Index