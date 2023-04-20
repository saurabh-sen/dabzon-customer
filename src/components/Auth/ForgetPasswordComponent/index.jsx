import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import forgetpassword_bg from "../../../../public/auth/forgetpassword_bg.svg"
import OtpModal from './OtpModal/index'

const Index = () => {

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({email: "", password: "", confirmPassword: ""})

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  return (
    <>
      <div className='ForgetPassword min-h-screen flex flex-col justify-center items-center  flex-wrap space-y-12'>
        <div className="forgetpassword__container flex justify-evenly items-center flex-wrap w-full">
          <Image className='hidden md:flex w-80 md:w-[550px]' src={forgetpassword_bg} alt="forgetpasswordBg" width={500} height={500} />
          <div className="text_container flex flex-col gap-8">

            <div className="heading">
              <p className='text-black font-semibold text-4xl'>Forgot Password</p>
              <p className='text-[#6b707a] text-base'>Don't worry, we all forget passwords sometimes</p>
            </div>

            <div className="input_text text-base flex flex-col gap-3">
              <div className="email flex flex-col gap-2">
                <label htmlFor="email" className=''>Your Email</label>
                <input onChange={(e) => setUserData((prev)=> prev = {...prev, email: e.target.value})} className='border border-gray-300 p-2 text-gray-700 outline-0 rounded-md outline focus:outline-gray-600' type="email" placeholder='Your Email Address...' />
              </div>
              <div className="password flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setUserData((prev)=> prev = {...prev, password: e.target.value})} className='border border-gray-300 p-2 text-gray-700 outline-0 rounded-md' type="password" placeholder='Your Password...' />
                <input onChange={(e) => setUserData((prev)=> prev = {...prev, confirmPassword: e.target.value})} className='border border-gray-300 p-2 text-gray-700 outline-0 rounded-md' type="password" placeholder='Confirm Your Password...' />
              </div>
              <div className="sign_up text-sm text-[#6b707a] cursor-pointer">
                <span><Link href="/auth/signup">Sign up </Link></span>
                |
                <span><Link href="/auth/login"> Sign In</Link></span>
              </div>
            </div>

            <div className="buttons flex flex-col items-center space-y-3">
              <button onClick={(e) => handleClick(e)} type='submit' className="change_btn bg-[#10b97e] rounded-3xl w-60 p-2 text-white text-base m-auto shadow-2xl">Change</button>
            </div>

          </div>
        </div>
        <div className="termsandpolicy text-[#6b707a]">
          <span> <Link href="/privacypolicy">Privacy Policy </Link></span>
          |
          <span> <Link href='/terms'>Terms of Service</Link> </span>
        </div>
      </div>
      {showModal && <OtpModal userData={userData} setShowModal={setShowModal} modelFor="forgetPassword" />}
    </>
  )
}

export default Index