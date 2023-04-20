import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const MobileNavBar = () => {

    const router = useRouter();
    const { pathname } = router;
    const { cart } = useSelector(state => state.cart);

    const [active, setActive] = useState({ home: false, search: false, profile: false, cart: false, });

    const activeLink = (pathname) => {
        switch (pathname) {
            case '/':
                setActive({ home: true, search: false, cart: false, call: false, whatsapp: false });
                break;
            case '/user/search':
                setActive({ home: false, search: true, cart: false, call: false, whatsapp: false });
                break;
            case 'call':
                setActive({ home: false, search: false, call: true, cart: false, whatsapp: false });
                break;
            case 'whatsapp':
                setActive({ home: false, search: false, call: false, cart: false, whatsapp: false });
                break;
            case '/user/cart':
                setActive({ home: false, search: false, cart: true, call: false, whatsapp: false });
                break;
            default:
                setActive({ search: false, cart: false, home: true, call: false, whatsapp: false });
        }
    }

    useEffect(() => {
        activeLink(pathname);
        // console.log(pathname)
    }, [])

    return (
        <div className='sm:hidden'>
            <section id="bottom-navigation" className="fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                <div id="tabs" className="flex justify-between items-center ">
                    <Link id="homepagelink" href="/" className={`group w-full focus:text-dabgreen hover:text-dabgreen justify-center inline-block text-center pt-2 pb-1 my-3 hover:my-0 focus-within:my-0 outline-0 ${active.home && 'text-dabgreen'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door inline-block mb-1" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                        </svg>
                        <span className={`${active.home ? 'block' : 'hidden'} text-xs`}>Home</span>
                        <div className={`block w-full bg-dabgreen rounded-t-3xl ${active.home ? 'h-2' : 'h-0'} transition-all duration-300`}></div>
                    </Link>
                    <Link href="/user/search" className={`group w-full focus:text-dabgreen hover:text-dabgreen justify-center inline-block text-center pt-2 pb-1 my-3 hover:my-0 focus-within:my-0 outline-0 ${active.search && 'text-dabgreen'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search inline-block mb-1" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <span className={`${active.search ? 'block' : 'hidden'} text-xs`}>Search</span>
                        <div className={`block w-full bg-dabgreen rounded-t-3xl ${active.search ? 'h-2' : 'h-0'} transition-all duration-300`}></div>
                    </Link>
                    <Link href="/user/cart" className={`group w-full focus:text-dabgreen hover:text-dabgreen justify-center inline-block text-center pt-2 pb-1 my-3 hover:my-0 focus-within:my-0 outline-0 ${active.cart && 'text-dabgreen'}`}>
                        <span className="cart__icon relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3 inline-block mb-1" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <span className={`absolute -top-2 -right-2 bg-dabgreen text-white rounded-full w-4 h-4 flex items-center justify-center text-xs ${cart.length < 1 && 'hidden'} `}>{cart.length}</span>
                        </span>
                        <span className={`${active.cart ? 'block' : 'hidden'} text-xs`}>Cart</span>
                        <div className={`block w-full bg-dabgreen rounded-t-3xl ${active.cart ? 'h-2' : 'h-0'} transition-all duration-300`}></div>
                    </Link>
                    <Link href="tel:+91-9513444408" onClick={() => activeLink('call')} className={`group w-full focus:text-dabgreen hover:text-dabgreen justify-center inline-block text-center pt-2 pb-1 my-3 hover:my-0 focus-within:my-0 outline-0 ${active.call && 'text-dabgreen'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className='inline-block mb-1' >
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                        <span className={`${active.call ? 'block' : 'hidden'} text-xs`}>Call</span>
                        <div className={`block w-full bg-dabgreen rounded-t-3xl ${active.call ? 'h-2' : 'h-0'} transition-all duration-300`}></div>
                    </Link>                    
                    <Link href="https://api.whatsapp.com/send?phone=9513444408&text=Hello this is the starting message" onClick={() => activeLink('whatsapp')} className={`group w-full focus:text-dabgreen hover:text-dabgreen justify-center inline-block text-center pt-2 pb-1 my-3 hover:my-0 focus-within:my-0 outline-0 ${active.whatsapp && 'text-dabgreen'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="inline-block mb-1">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                        <span className={`${active.whatsapp ? 'block' : 'hidden'} text-xs`}>Whatsapp</span>
                        <div className={`block w-full bg-dabgreen rounded-t-3xl ${active.whatsapp ? 'h-2' : 'h-0'} transition-all duration-300`}></div>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default MobileNavBar