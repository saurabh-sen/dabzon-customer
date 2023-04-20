import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useCallback } from 'react';
import MobileNavBar from './MobileNavBar/index';
import avatar from '../../../public/avatar.png'
import logo from '../../../public/icons/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../reduxStore/Slices/Loader/LoaderSlice'
import { signOut } from 'next-auth/react';
import { deleteCookie } from '../../cookie/index';


function NavBar({ searchQuery = "", setSearchQuery, searchResults = [], setSearchResults }) {
    // idk what to do with this
    const [login, setLogin] = useState(1);

    const search = useRef(null);
    const router = useRouter();
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const { loading } = useSelector(state => state.loading);

    const debounce = (cb, d) => {
        let timer;
        return function (searchQuery) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(searchQuery);
            }, d);
        };
    };

    const handleSearch = async (searchQuery) => {
        if (searchQuery.length === 0) return;
        dispatch(setLoading(true));
        const response = await fetch(`/api/search/${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.msg);
        dispatch(setLoading(false));
    }

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

    const handleSearchProduct = (e) => {
        e.preventDefault();
        setSearchQuery(searchQuery => searchQuery = e.target.value.toLowerCase());
        debouncedHandleSearch(e.target.value.toLowerCase());
    }

    const handleSignOut = () => {
        signOut();
        deleteCookie("userSession");
    }

    useEffect(() => {
        search.current.focus();
    }, []);

    return (
        <div className='Navbar sticky top-0 z-30 inline-block w-full bg-dabgreen md:bg-white'>
            <nav className="backdrop-blur-md z-10 py-0 flex justify-between gap-3 max-w-7xl  items-center my-1 md:my-3 mx-auto px-[3vw] flex-wrap">
                <Link href='/' className="logo inline-block bg-dabgreen text-white p-1 font-normal rounded-full">
                    <Image width={50} height={50} className="" src={logo} alt="logo" />
                </Link>
                <button onClick={() => { router.pathname !== '/user/search' && router.push('/user/search')}} className="group search__container md:flex flex-row gap-3 bg-[#f3f4f6] rounded-3xl px-4 !py-3 hidden items-center relative">
                    <svg className='sm:w-5' xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <input ref={search} onChange={(e) => handleSearchProduct(e)} className='border-0 outline-none bg-transparent w-56' type="search" name="search" id="search" placeholder='Search...' value={searchQuery} />
                    {/* relevant search results */}
                    {/* <div className="search__results bg-white rounded-md shadow-md absolute top-[70px] left-0 hidden group-focus-within:block w-full z-20" autoComplete="off">
                        {
                            searchQuery.length === 0
                                ? null
                                :
                                <div className="search__results my-3 p-3 text-left">
                                    <p className="search__results__title text-sm">Most Relevent Results</p>
                                    <div className="search__results__list flex items-center flex-col gap-2 mt-2">
                                        {
                                            !loading
                                                ? searchResults.map((it, idx) => {
                                                    if (idx > 5) return;
                                                    return (<div key={idx} onClick={(e) => router.push(`/product/${it._id}`)} className="search__results__item bg-[#f3f4f6] rounded-md px-2 py-1 text-sm flex justify-between items-center w-full">
                                                        <Image width={40} height={40} className="rounded-full bg-white aspect-square" src={it.image1} alt="logo" />
                                                        <div className="search__results__item__details flex flex-col gap-1">
                                                            <p className="search__results__item__name text-xs font-medium">{it.productName}</p>
                                                            <p className="search__results__item__price text-xs font-medium truncate">{it.productShortDescription}</p>
                                                        </div>
                                                        <p className="search__results__item__name text-dabgreen text-lg font-semibold">₹{it.price}</p>
                                                    </div>)
                                                })
                                                : <svg className="animate-spin h-6 w-6 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                        }
                                    </div>
                                </div>
                        }

                    </div> */}
                </button>
                <div className="navlinks md:flex gap-4 hidden">
                    <Link href='/'>Home</Link>
                    <Link href='/all/topSellingProducts'>Products</Link>
                    <Link href='/all/allCategories'>Category</Link>
                    <Link href='/all/allBrands'>Brand</Link>
                    <Link href='/utility/about'>About Us</Link>
                </div>
                <div className="account__and__carts md:flex space-x-4 hidden">
                    {
                        !login ?
                            <>
                                <Link href='/auth/login' className="login border border-dabgreen text-dabgreen font-semibold hover:bg-dabgreen hover:text-white focus:bg-dabgreen focus:text-white px-6 py-2 rounded-full">Log In</Link>
                                <Link href='/auth/signup' className="signup border border-dabgreen text-dabgreen font-semibold hover:bg-dabgreen hover:text-white focus:bg-dabgreen focus:text-white px-6 py-2 rounded-full">Sign Up</Link>
                            </>
                            :
                            <button onClick={() => router.push('/user/profile')} className="logout border border-dabgreen text-dabgreen font-semibold hover:bg-dabgreen hover:text-white focus:bg-dabgreen focus:text-white rounded-full">
                                <Image className='w-10 rounded-full' src={avatar} alt="avatar" width={1000} height={1000} />
                            </button>
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
