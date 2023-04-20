import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function OptModal({ userData, setShowModal, modelFor }) {
    const router = useRouter();
    const [otp, setOtp] = useState("yyyyyy");
    const [userOtp, setUserOtp] = useState("xxxxxx");
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (otp.toString() === userOtp.toString()) {
            if (modelFor === "accountVerification") {
                const res = await fetch(`/api/user/signup`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await res.json();
                if (data.msg === "user is already present") {
                    alert("you are already resgistered");
                }
                else if (data.msg === "user is created") {
                    alert("user is created");
                }
            }
            else if(modelFor === "forgetPassword"){
                const obj={
                    email: userData.email,
                    password: userData.password
                }
                const res = await fetch(`/api/user/changepassword`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                });
                const data = await res.json();
                alert(data.msg);
                router.replace("/auth/login?redirect=profile");
            }
        }
        else alert("otp is wrong")

        setShowModal(false)
    }


    const sendOtp = async () => {
        var temp = Math.floor(100000 + Math.random() * 900000);
        setOtp(temp);
        const obj = {
            email: userData.email,
            otp: temp
        }
        const res = await fetch(`/api/mail/sendotp`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
    }

    const handleResendOtp = (e) => {
        e.preventDefault();
        // console.log("resend otp");
        sendOtp();
    }

    useEffect(() => {
        sendOtp();
    }, [])

    return (
        <div className="fixed z-10 top-0 left-0 w-full flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 bg-opacity-80 backdrop-blur-sm py-12" >
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {userData.email}</p>
                        </div>
                    </div>

                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs gap-3">
                                    <div className="w-50 h-12 border border-[#10b97e] rounded-xl">
                                        <input onChange={(e) => setUserOtp(e.target.value)} className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#10b97e]" type="text" maxLength="6" name="" id="" />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={(e) => handleOtpSubmit(e)} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#10b97e] border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p> <a onClick={(e) => handleResendOtp(e)} className="flex flex-row items-center text-green-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <span className="icon absolute right-3 top-3 bg-[#10b97e30] hover:bg-[#73f9cab8] cursor-pointer rounded-full p-3">
                    <svg onClick={() => console.log('close the modal')} className=' h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                </span> */}
            </div>
        </div>
    )
}