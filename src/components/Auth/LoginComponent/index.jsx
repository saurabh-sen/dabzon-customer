import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'
import login_bg from '../../../../public/auth/login_bg.svg'
import { useState } from 'react'
import { setCookie, getCookie } from '../../../cookie/index'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Index = ({redirect}) => {
  const router = useRouter();
  const {data : session} = useSession();
  const [userData, setUserData] = useState({ email: '', password: '' })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if(data.msg === "wrong email or password"){
      alert("wrong email or password")
    }
    else{
      await setCookie("userSession", data.body.email,1);
      await router.replace(`/user/${redirect}`);
    }
  }
 
  const handleGoogleSignin = async() => {
    signIn('google');
  }

  useEffect(() => {
    if(session?.user?.email !== undefined){
      setCookie("userSession",session.user.email,1);
      router.replace(`/user/${redirect}`);
    }
  } ,[session])

  return (
    <section className="flex items-center justify-evenly min-h-screen bg-gray-100 flex-wrap py-16">
      <Image width={445} height={445} src={login_bg} className="m-2 hidden md:block" alt="Sample image" />
      <div className="flex flex-col items-center justify-center min-w-[300px] space-y-8 ">
        <div className="customer__heading w-full ">
          <p className="font-semibold text-2xl text-gray-900">
            Welcome Back!!!
          </p>
          <p className="text-[#111827] text-base opacity-60">
            Login to continue
          </p>
        </div>
        <div className="customer__info space-y-2 text-base ">
          <div className=" customer__email flex flex-col ">
            <label
              className="text-gray-900 "
              htmlFor="email"
            >
              Your Email
            </label>
            <input
              onChange={(e) => setUserData((prev) => prev = { ...prev, email: e.target.value })}
              className="border-gray-300 border rounded-md p-2 outline-0  bg-transparent w-[300px] "
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="customer__password flex flex-col space-y-2">
            <label className="text-gray-900 " htmlFor="password" >Your password</label>
            <input onChange={(e) => setUserData((prev) => prev = { ...prev, password: e.target.value })} className="border-gray-300 border rounded-md p-2 outline-0 bg-transparent w-[300px] " type="password" id="password"
              name="password"
              placeholder="Enter your password"
            />

            <div className=" text-[#6b707a]">
              <span className=" text-xs cursor-pointer ">
                <Link href='/utility/forgetpassword' >
                  Forget password
                </Link>
              </span> |
              <span className=" text-xs cursor-pointer">
                <Link href='/auth/signup' > Signup
                </Link>
              </span>
            </div>
          </div>
        </div>

        <div className="buttons__container flex flex-col items-center">
          <button onClick={(e) => handleSubmit(e)} className="bg-dabgreen text-white w-56 rounded-full h-9 mt-5 shadow-2xl"
            type="button"
          >
            Login
          </button>
          <p className="opacity-60 text-[0.8rem] my-[1rem]">OR</p>
          <button onClick={() => handleGoogleSignin()} className="signupwithgoogle bg-dabgreen cursor-pointer rounded-full p-2 text-white flex items-center gap-3">
            <span className="auth__icon ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
            </span>
            <p className="">Signin with Google</p>
          </button>
        </div>
        <p className="opacity-60 text-[0.8rem] my-12 flex gap-3">
          <Link href='/utility/privacypolicy'>Privacy & policy</Link>
          <span>|</span>
          <Link href='/utility/terms'>Term & Condition</Link>
        </p>
      </div>
    </section>
  )
}

export default Index