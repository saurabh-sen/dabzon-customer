import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import MobileNavBar from './MobileNavBar/index';
import avatar from '../../../public/avatar.png'
import logo from '../../../public/icons/logo.svg'
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import { deleteCookie, getCookie } from '../../cookie/index';

function NavBar({ searchQuery = "", setSearchQuery, handleSearchProduct }) {
    const [login, setLogin] = useState({
        login: false,
        name: "",
        email: "",
        avatar: "",
    });
    const router = useRouter();
    const [navbar, setNavbar] = useState(false);
    const { cart } = useSelector(state => state.cart);

    const handleSignOut = () => {
        signOut();
        deleteCookie("userSession");
    }

    useEffect(() => {
        if(getCookie("userSession")){
            setLogin(prev => prev = {...prev, login:true});
        }
        fetch(`/api//user/navbarProfile?userId=${getCookie("userSession")}`).then((res) => res.json()).then((data) => {
            if(data.status === 200){

                setLogin(prev => prev = {login:true, name:data.data.name, email: data.data.email, avatar: data.data.image});
            }
        })
        if (router.query.searchQuery) {
            setSearchQuery(searchQuery => searchQuery = router.query.searchQuery);
            debouncedHandleSearch(router.query.searchQuery.toLocaleLowerCase());
        }
    }, [router.query.searchQuery]);

    // console.log(login);

    return (
        <div className='Navbar sticky top-0 z-30 inline-block w-full bg-dabgreen md:bg-white'>
            <nav className="backdrop-blur-md z-10 py-0 flex justify-between gap-3 max-w-7xl  items-center my-1 md:my-3 mx-auto px-[3vw] flex-wrap">
                <Link href='/' className="logo inline-block bg-dabgreen text-white p-1 font-normal rounded-full">
                    <Image width={50} height={50} className="" src={logo} alt="logo" />
                </Link>
                <button onClick={() => { router.pathname !== '/user/search' && router.push('/user/search') }} className="group search__container md:flex flex-row gap-3 bg-[#f3f4f6] rounded-3xl px-4 !py-3 hidden items-center relative">
                    <svg className='sm:w-5' xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <input onChange={(e) => handleSearchProduct(e)} className='border-0 outline-none bg-transparent w-56' type="search" name="search" id="search" placeholder='Search...' value={searchQuery} />
                </button>
                <div className="navlinks md:flex gap-4 hidden">
                    <Link href='/'>Home</Link>
                    <Link href='/all/topSellingProducts'>Products</Link>
                    <Link href='/all/allCategories'>Category</Link>
                    <Link href='/all/allBrands'>Brand</Link>
                    <Link href='/utility/about'>About Us</Link>
                </div>
                <div className="account__and__carts md:flex space-x-4 hidden">
                    {/* todo */}
                    {
                        login.login ?
                            <button onClick={() => router.push('/user/profile')} className="logout border border-dabgreen font-semibold bg-dabgreen text-white focus:text-white rounded-full flex gap-2 items-center px-3 py-1">
                                <p className="text-sm font-medium">{login.name}</p>
                                <Image className='w-10 rounded-full' src={login.avatar} alt="avatar" width={1000} height={1000} />
                            </button>
                            :
                            <>
                                <Link href='/auth/login' className="login border border-dabgreen text-dabgreen font-semibold hover:bg-dabgreen hover:text-white focus:bg-dabgreen focus:text-white px-6 py-2 rounded-full">Log In</Link>
                                <Link href='/auth/signup' className="signup border border-dabgreen font-semibold bg-dabgreen hover:text-white text-white px-6 py-2 rounded-full">Sign Up</Link>
                            </>
                    }
                    <Link href='/user/cart' className="cart__icon my-auto relative">
                        <svg className='sm:w-5' xmlns="http://www.w3.org/2000/svg" fill="#10b981" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <span className={`absolute -top-2 -right-2 bg-dabgreen text-white rounded-full w-4 h-4 flex items-center justify-center text-xs ${cart.length < 1 && 'hidden'} `}>{cart.length}</span>
                    </Link>
                </div>

                <button onClick={() => setNavbar(!navbar)} className="hamburger flex md:hidden mx-6">
                    <svg className='w-8' xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
            </nav>
            <div className={`navlinks text-center text-white ${navbar ? 'flex' : 'hidden'} flex-col gap-4 md:hidden my-8`}>
                <Link href='/'>Home</Link>
                <Link href='/all/allCategories'>Category</Link>
                <Link href='/all/allBrands'>Brand</Link>
                <Link href='/utility/about'>About Us</Link>
                <Link href='/user/profile'>Profile</Link>
            </div>
            <MobileNavBar />
        </div>
    );
}

export default NavBar;
