import Image from 'next/image'
import React from 'react'
import avatar from '../../../../../public/avatar.png'

const Index = ({ item }) => {
    return (
        <div className='first__row__item__container'>
            <div className='first__row__item w-80 md:w-[450px] my-8 bg-[#fefcfb] rounded-3xl relative shadow-sm'>
                <span className="w-12 md:w-16 bg-[#fefcfb] object-cover rounded-full absolute border-[#FFFFFFD6] border-8 -top-6 left-9 ">
                    <Image alt="team" height={100} width={100} src={item?.image ? item?.image : avatar} className=" rounded-full drop-shadow-lg" />
                </span>
                <div className='p-3 md:p-6'>
                    <div className='pt-3 md:pt-5 w-full'>
                        <p className='text-gray-900 text-lg md:text-2xl font-semibold'>{item?.name}</p>
                        <p className='stars text-xs flex gap-1'>
                            {
                                [...Array(+(item?.rating) / 2).keys()].map((item, idx) => <span key={idx}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.7976 9.74C12.6033 9.92825 12.5141 10.2005 12.5583 10.4675L13.2251 14.1575C13.2813 14.4703 13.1493 14.7868 12.8876 14.9675C12.6311 15.155 12.2898 15.1775 12.0101 15.0275L8.68831 13.295C8.57281 13.2335 8.44456 13.2005 8.31331 13.1968H8.11006C8.03956 13.2073 7.97056 13.2298 7.90756 13.2643L4.58506 15.005C4.42081 15.0875 4.23481 15.1168 4.05256 15.0875C3.60856 15.0035 3.31231 14.5805 3.38506 14.1343L4.05256 10.4443C4.09681 10.175 4.00756 9.90125 3.81331 9.71L1.10506 7.085C0.878555 6.86525 0.799805 6.53525 0.903305 6.2375C1.00381 5.9405 1.26031 5.72375 1.57006 5.675L5.29756 5.13425C5.58106 5.105 5.83006 4.9325 5.95756 4.6775L7.60006 1.31C7.63906 1.235 7.68931 1.166 7.75006 1.1075L7.81756 1.055C7.85281 1.016 7.89331 0.98375 7.93831 0.9575L8.02006 0.9275L8.14756 0.875H8.46331C8.74531 0.90425 8.99356 1.073 9.12331 1.325L10.7876 4.6775C10.9076 4.92275 11.1408 5.093 11.4101 5.13425L15.1376 5.675C15.4526 5.72 15.7158 5.9375 15.8201 6.2375C15.9183 6.53825 15.8336 6.86825 15.6026 7.085L12.7976 9.74Z" fill="#FBBF24" />
                                    </svg>
                                </span>)
                            }
                        </p>
                        <p className='text-gray-400 text-sm break-words'>{item?.comment}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index