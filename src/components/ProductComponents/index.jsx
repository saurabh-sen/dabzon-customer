import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import ProductCapacityDropDown from './ProductCapacityDropDown/index'
import CheckDeliveryAvaibility from './CheckDeliveryAvaibility/index'
import rating from '../../../public/icons/rating.svg'
import replacement from '../../../public/icons/replacement.svg'
import warranty from '../../../public/icons/warranty.svg'
import bestprice from '../../../public/icons/bestprice.svg'
import trolley from '../../../public/icons/trolley.svg'
import exchange from '../../../public/icons/exchange.svg'
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, setCart } from "../../reduxStore/Slices/Cart/CartSlice";

const Productdetailsview = ({ productId }) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const [productDetails, setProductDetails] = React.useState(null);
    const [mainImage, setMainImage] = React.useState(null);
    const [couponCode, setCouponCode] = React.useState({
        prevPrice: 0,
        prevCouponCode: "",
        couponCode: "",
        couponDiscount: 0,
        couponResult: "",
        couponState: false,
        payingPriceAfterCoupon: 0,
    });

    const [productState, setProductState] = React.useState({
        _id: '',
        productId: "",
        productName: "",
        productImage: "",
        productPrice: null,
        productFakeDiscount: null,
        productWithExchange: null,
        exchange: false,
        productWithTrolley: null,
        trolley: false,
        productCouponCode: "",
        couponDiscountPrice: 0,
        productCapacity: "",
        productDeliveryCity: "",
        productDeliveryCityPrice: 0,
        productBrand: "",
        productCategory: "",
        quantity: 0,
    });

    const fetchProductDetails = async (productId) => {
        if (!productId) return;
        const response = await fetch(`/api/product/${productId}`);
        const { productData, capacityData } = await response.json();
        setProductDetails({ ...productData, capacityArr: capacityData });
        setMainImage(productData.image1);
        setProductState(prev => prev = {
            ...prev,
            _id: productData._id,
            productId: productData._id,
            productShortDescription: productData.productShortDescription,
            productName: productData.productName,
            productImage: productData.image1,
            productPrice: productData.price,
            productFakeDiscount: productData.fakeDiscount,
            productCapacity: productData.productCapacity,
            productBrand: productData.productBrand,
            productCategory: productData.productCategory,
            productWithExchange: productData.exchangeAmount,
            productWithTrolley: productData.trolleyPrice,
            quantity: 1,
            city: productData.city
        })
        setCouponCode(prev => prev = { ...prev, prevPrice: productData.price })
    }
    const buyNow = (e) => {
        e.preventDefault();
        if (productState.productDeliveryCity === "") return alert("Please select your city");
        let copyproductState = { ...productState, productCouponCode: couponCode.couponCode, productCouponCodeDiscount: couponCode.couponDiscount, couponDiscountPrice: couponCode.payingPriceAfterCoupon };
        dispatch(setCart(copyproductState));
        router.replace('/user/cart');
    }

    const addToCart = (e) => {
        e.preventDefault();
        if (productState.productDeliveryCity === "") return alert("Please select your city");
        let copyproductState = { ...productState, productCouponCode: couponCode.couponCode, productCouponCodeDiscount: couponCode.couponDiscount, couponDiscountPrice: couponCode.payingPriceAfterCoupon };

        dispatch(setCart(copyproductState));
    }

    // const handleRemoveFromCart = (e, id) => {
    //     e.preventDefault();
    //     dispatch(deleteFromCart(id))
    // }

    const applyCoupon = (e) => {
        e.preventDefault();

        if (couponCode.prevCouponCode === couponCode.couponCode) {
            return;
        }
        for (let i = 0; i < productDetails.coupons.length; i++) {
            if (productDetails.coupons[i] === couponCode.couponCode && couponCode.prevCouponCode !== couponCode.couponCode) {
                let afterSplitArray = couponCode.couponCode.match(/[a-zA-Z]+|[0-9]+/g);
                let discountPercent = Number(afterSplitArray[1]);
                setCouponCode(prev => prev = {
                    ...prev,
                    prevCouponCode: couponCode.couponCode,
                    couponDiscount: discountPercent,
                    couponResult: "Valid",
                    couponState: true,
                    payingPriceAfterCoupon: Math.round((+couponCode.prevPrice) * (discountPercent / 100))
                });
                setProductState((prev) => prev = { ...prev, productCouponCode: couponCode.couponCode })
                return;
            }
        }

        setCouponCode((prev) => prev = {
            ...prev,
            prevCouponCode: "",
            couponCode: "",
            couponDiscount: 0,
            couponResult: "Invalid",
            couponState: false,
            payingPriceAfterCoupon: 0,
        })
    }

    const resetCart = () => {
        setProductState(prev => prev = {
            _id: '',
            productId: "",
            productName: "",
            productImage: "",
            productPrice: null,
            productWithExchange: null,
            exchange: false,
            productWithTrolley: null,
            trolley: false,
            productCouponCode: "",
            couponDiscount: 0,
            productCapacity: "",
            productDeliveryCity: "",
            productDeliveryCityPrice: 0,
            productBrand: "",
            productCategory: "",
            quantity: 0,
        })
        setCouponCode({
            prevPrice: 0,
            prevCouponCode: "",
            couponCode: "",
            couponDiscount: 0,
            couponResult: "",
            couponState: false,
            payingPriceAfterCoupon: 0,
        })
    }

    const downloadManual = (e) => {
        e.preventDefault();
        console.log("manual");
        // window.open(productDetails.manual, '_blank');
    }

    useEffect(() => {
        resetCart();
        fetchProductDetails(productId);
    }, [productId])

    // console.log(productState)

    return (
        <div className="ProductDetailsPage my-8 min-h-[70vh] flex justify-center items-center">
            {productDetails ?
                <div className="ProductDetailsPage__container max-w-7xl mx-auto mb-8 ">
                    <div className="ProductDetailsPage__breadcrumbs my-4 px-[4vw]">
                        <Link href="/" className="text-dabgreen">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <Link href="/all/topSellingProducts" className="text-dabgreen">Products</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-400">{productDetails.productName}</span>
                    </div>

                    <div className="Product__image__specification flex justify-center flex-wrap ">
                        <div className="Product__image flex flex-col justify-center items-center ">
                            <div className="product__main__image bg-gray-200 rounded-xl m-2 w-[250px] h-[250px] md:w-[490px] md:h-[300px] relative">
                                <div className="flex justify-between pt-4 px-4">
                                    <p className="border text-dabgreen border-dabgreen rounded-full text-xs px-4 py-[6px] text-center bg-gray-50">
                                        {productDetails.productCategory}
                                    </p>
                                </div>
                                <Image className="p-4 w-auto h-auto mx-auto" loading="lazy" src={mainImage} width={450} height={280} alt="Image is loading..." />
                                <div className={`absolute bottom-0 left-0 flex justify-center items-center w-[6.5rem] h-[30px] ${+productDetails.stock > 0 ? 'border-dabgreen text-dabgreen' : 'border-rose-500 text-rose-500'} bg-gray-50 border rounded-full ml-4 mb-4`}>
                                    <p className="flex text-xs">
                                        {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                </div>
                            </div>
                            <div className="Product__images__container flex m-2 space-x-1 justify-between ">
                                <button className="rounded-xl border hover:border-dabgreen focus:border-dabgreen bg-gray-200 w-[95px] lg:w-[163px] sm:w-[145px] aspect-4/3">
                                    <Image onClick={() => setMainImage(prev => prev = productDetails.image1)}
                                        className="py-6"
                                        loading="lazy"
                                        src={productDetails.image1}
                                        width={1000}
                                        height={1000}
                                        alt="Image is loading..."
                                    />
                                </button>
                                <button className="rounded-xl border hover:border-dabgreen focus:border-dabgreen bg-gray-200 w-[95px] lg:w-[163px] sm:w-[145px] aspect-4/3">
                                    <Image onClick={() => setMainImage(prev => prev = productDetails.image2)}
                                        className="py-6"
                                        loading="lazy"
                                        src={productDetails.image2}
                                        width={1000}
                                        height={1000}
                                        alt="Image is loading..."
                                    />
                                </button>
                                <button className="rounded-xl border hover:border-dabgreen focus:border-dabgreen bg-gray-200 w-[95px] lg:w-[163px] sm:w-[145px] aspect-4/3">
                                    <Image onClick={() => setMainImage(prev => prev = productDetails.image3)}
                                        className="py-6  "
                                        loading="lazy"
                                        src={productDetails.image3}
                                        width={1000}
                                        height={1000}
                                        alt="Image is loading..."
                                    />
                                </button>
                            </div>
                        </div>
                        <form className="Product__text__specification flex flex-col sm:space-y-2 space-y-1">
                            <div className="flex justify-center sm:justify-start">
                                <p className="sm:text-[2rem]  text-[1.3rem] text-gray-900 mx-2 sm:text-left text-center" >
                                    {productDetails.productName}
                                </p>
                            </div>
                            <div className="ProductPrice mx-2 flex items-center justify-center sm:justify-start">
                                <span className="text-dabgreen text-2xl">₹{+productState.productPrice} </span>
                                <span className="text-gray-500 text-base line-through mx-3">
                                    {/* ₹{Math.round((productState.productDeliveryCityPrice ? +productState.productDeliveryCityPrice : +productDetails.price) * 100 / (+productDetails.fakeDiscount))} */}
                                    ₹{Math.round((+productState.productPrice) / (1 - (productDetails.fakeDiscount / 100)))}
                                </span>
                                <span className="text-rose-500 font-semibold text-lg">{productDetails.fakeDiscount} %OFF</span>
                            </div>

                            <div className="exchange__trolley__container flex flex-wrap sm:justify-start justify-center">
                                {+productDetails.exchangeAmount
                                    ? <div className="withExchangePrice__container">
                                        <input onChange={() => setProductState(prev => prev = { ...prev, exchange: !productState.exchange })} className="hidden" id="withExchangePrice" type="checkbox" name="exchange" checked={productState.exchange ? true : false} />
                                        <label className="radio withExchangePrice__container box-border m-2 border-gray-200 bg-gray-50 border h-16 w-60 flex items-center rounded-xl hover:shadow-md  text-left cursor-pointer gap-3 px-3" htmlFor="withExchangePrice">
                                            <span className="icon p-2 bg-dabgreen rounded-full">
                                                <Image className="" loading="lazy" src={exchange} alt="Image is loading..." width={20} height={20} />
                                            </span>
                                            <div className="withExchangePrice flex flex-col">
                                                <p className=" text-sm text-gray-700">WITH EXCHANGE</p>
                                                <p className="  text-xs text-gray-700">₹{productDetails.exchangeAmount}</p>
                                            </div>
                                        </label>
                                    </div>
                                    : null
                                }
                                {/* <div className="withoutExchangePrice__container">
                                    <input onChange={() => setproductState(prev => prev = { ...prev, exchange: false })} className="hidden" id="withoutExchangePrice" type="radio" name="exchange" checked={productState.exchange ? false : true} />
                                    <label className="withoutExchangePrice__container radio box-border m-2 border-gray-200 bg-gray-50 border h-16 w-60 flex items-center rounded-xl hover:shadow-md  text-left cursor-pointer" htmlFor="withoutExchangePrice">
                                        <Image
                                            className="mx-4 "
                                            loading="lazy"
                                            src={with_exchange}
                                            alt="Image is loading..."
                                            width={30}
                                            height={30}
                                        />
                                        <div className="withExchangePrice flex flex-col">
                                            <p className=" text-sm text-gray-700">WITHOUT EXCHANGE</p>
                                            <p className="  text-xs text-gray-700">₹{productState.productPrice}</p>
                                        </div>
                                    </label>
                                </div> */}
                                {+productDetails.trolleyPrice
                                    ? <div className="withTrolleyPrice__container">
                                        <input onChange={() => setProductState(prev => prev = { ...prev, trolley: !productState.trolley })} className="hidden" id="withTrolleyPrice" type="checkbox" name="trolley" checked={productState.trolley ? true : false} />
                                        <label className="withExchangePrice__container radio box-border m-2 border-gray-200 bg-gray-50 border h-16 w-60 flex items-center rounded-xl hover:shadow-md text-left cursor-pointer gap-3 px-3" htmlFor="withTrolleyPrice">
                                            <span className="icon p-2 bg-dabgreen rounded-full">
                                                <Image className="aspect-square" loading="lazy" src={trolley} alt="Image is loading..." width={20} height={20} />
                                            </span>
                                            <div className="withExchangePrice flex flex-col">
                                                <p className=" text-sm text-gray-700">WITH TROLLEY</p>
                                                <p className=" text-xs text-gray-700">₹{(+productDetails.trolleyPrice)}</p>
                                            </div>
                                        </label>
                                    </div>
                                    : null
                                }
                            </div>

                            {/* {+productDetails.trolleyPrice ? <div className="TrolleyPrice__container flex flex-wrap sm:justify-start  justify-center">
                                <div className="withTrolleyPrice__container">
                                    <input onChange={() => setproductState(prev => prev = { ...prev, trolley: !productState.trolley })} className="hidden" id="withTrolleyPrice" type="checkbox" name="trolley" checked={productState.trolley ? true : false} />
                                    <label className="withExchangePrice__container radio box-border m-2 border-gray-200 bg-gray-50 border h-16 w-60 flex items-center rounded-xl hover:shadow-md text-left cursor-pointer" htmlFor="withTrolleyPrice">
                                        <Image
                                            className="mx-4 "
                                            loading="lazy"
                                            src={with_exchange}
                                            alt="Image is loading..."
                                            width={30}
                                            height={30}
                                        />
                                        <div className="withExchangePrice flex flex-col">
                                            <p className=" text-sm text-gray-700">WITH TROLLEY</p>
                                            <p className=" text-xs text-gray-700">₹{(+productState.productWithTrolley)}</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="withoutTrolleyPrice__container">
                                    <input onChange={() => setproductState(prev => prev = { ...prev, trolley: false })} className="hidden" id="withoutTrolleyPrice" type="radio" name="trolley" checked={productState.trolley ? false : true} />
                                    <label className="withoutTrolleyPrice__container radio box-border m-2 border-gray-200 bg-gray-50 border h-16 w-60 flex items-center rounded-xl hover:shadow-md  text-left cursor-pointer" htmlFor="withoutTrolleyPrice" >
                                        <Image
                                            className="mx-4 "
                                            loading="lazy"
                                            src={with_exchange}
                                            alt="Image is loading..."
                                            width={30}
                                            height={30}
                                        />
                                        <div className="withTrolleyPrice flex flex-col">
                                            <p className=" text-sm text-gray-700">Without Trolley</p>
                                            <p className="  text-xs text-gray-700">₹{productState.productPrice}</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                                : null} */}

                            <div className="couponCode__container flex flex-wrap items-center justify-center sm:justify-start mx-2 !mb-4 gap-3">
                                <span className="p-2 rounded-full bg-[#6366f1] sm:block hidden">
                                    <Image className="" loading="lazy" src={bestprice} alt="Image is loading..." width={20} height={20} />
                                </span>
                                <div className="flex items-center justify-center flex-wrap gap-3 mx-3">
                                    <div className="inputcontianer relative">
                                        <input onChange={(e) => setCouponCode(prev => prev = { ...prev, couponCode: e.target.value })} type="text" name="searchCoupon" id="searchCoupon" className="bg-gray-50 border border-dabgreen rounded-full py-1 px-3 outline-none" value={couponCode.couponCode} placeholder="Apply Coupon here..." />
                                        {
                                            couponCode.couponResult === "Invalid"
                                                ? <p className="couponResult text-sm text-red-500 absolute -bottom-5 left-0">Invalid or already used Coupon</p>
                                                : couponCode.couponResult === "Valid"
                                                    ? <p className="couponResult text-xs text-dabgreen absolute -bottom-8 left-0">"{productState.productCouponCode}" Coupon applied, you have saved ₹{+couponCode.payingPriceAfterCoupon} </p>
                                                    : null
                                        }
                                    </div>
                                    <button onClick={(e) => applyCoupon(e)} type="button" className="border border-dabgreen rounded-full py-1 px-3 mx-3 hover:bg-dabgreen focus-within:bg-dabgreen hover:text-white focus-within:text-white bg-gray-50 text-gray-800 shadow-md ">Apply</button>
                                </div>
                            </div>
                            <div className="capacity__replacements flex flex-wrap justify-center sm:justify-start py-" >
                                <div className="capacity__dropdown box-border m-2 h-16 w-40 rounded-xl">
                                    <ProductCapacityDropDown productState={productState} capacityArray={productDetails.capacityArr} />
                                </div>
                                <div className="warranty box-border m-2 border-gray-200 bg-gray-50  border h-16 w-40 flex items-center rounded-xl px-3 gap-3">
                                    <span className="p-2 rounded-full bg-[#312e81]">
                                        <Image className="" loading="lazy" src={warranty} alt="Image is loading..." width={20} height={20} />
                                    </span>
                                    <div className="flex flex-col">
                                        <p className=" text-sm text-gray-700">Warranty</p>
                                        <p className="  text-xs text-gray-700">{productDetails.warranty}</p>
                                    </div>
                                </div>
                                <div className="replacement box-border m-2 border-gray-200 bg-gray-50 border h-16 w-40 flex items-center rounded-xl px-3 gap-3">
                                    <span className="p-2 rounded-full bg-[#6366f1]">
                                        <Image className="" loading="lazy" src={replacement} alt="Image is loading..." width={20} height={20} />
                                    </span>
                                    <div className="flex flex-col">
                                        <p className=" text-sm text-gray-700">Replacement</p>
                                        <p className="  text-xs text-gray-700">{productDetails.replacementDuration}</p>
                                    </div>
                                </div>
                                <div className="rating box-border m-2 border-gray-200 bg-gray-50  border h-16 w-40 flex items-center rounded-xl px-3 gap-3">
                                    <span className="p-2 rounded-full bg-[#78350f]">
                                        <Image className="" loading="lazy" src={rating} alt="Image is loading..." width={20} height={20} />
                                    </span>
                                    <div className="flex flex-col">
                                        <p className=" text-sm text-gray-700">Rating</p>
                                        <p className="  text-xs text-gray-700">{productDetails.rating}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="delivery__shareProduct flex flex-wrap gap-x-5 sm:gap-1 justify-center sm:justify-start">
                                <div className="delivery__citysm:space-y-6 space-y-2 my-3 mx-2">
                                    <p className="text-gray-900 text-lg sm:text-xl text-center">
                                        Select your city
                                    </p>
                                    <CheckDeliveryAvaibility cityArray={productDetails.city} productState={productState} setProductState={setProductState} setCouponCode={setCouponCode} />
                                </div>

                                <div className="share__products flex gap-3 items-center justify-center sm:block space-y-2 my-3 sm:mx-8 mx-2">
                                    <p className="text-gray-900 sm:text-xl text-lg">Copy link</p>
                                    <button type='button' onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CUSTOMER_HOST}/product/${productDetails._id}`)} className="relative group bg-dabgreen p-2 rounded-full cursor-pointer w-min">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-link" viewBox="0 0 16 16">
                                            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                                        </svg>
                                        <span className="hidden group-focus-within:block absolute -right-12 top-[6px] text-dabgreen text-sm ">Copied</span>
                                    </button>
                                </div>
                            </div>
                            <div className="buynow__addtocart__buttons flex justify-center sm:justify-start">
                                <button onClick={(e) => buyNow(e)} className=" text-dabgreen  bg-gray-50 border border-dabgreen rounded-full mx-2 py-2 px-4">
                                    Buy Now
                                </button>
                                {/* {cart.find((item) => item._id === productDetails._id) !== undefined */}
                                {/* ? <button onClick={(e) => handleRemoveFromCart(e, productDetails._id)} className="text-xs hover:bg-red-600 focus:bg-red-500 hover:text-white focus:text-white md:text-sm border-red-500 border text-red-500 rounded-full px-4 py-[6px]">Remove</button>
                                    :  */}
                                <button onClick={(e) => addToCart(e)} type="submit" className=" text-white hover:text-gray-50  border bg-dabgreen border-dabgreen rounded-full mx-2 py-2 px-4 hover:shadow-md">
                                    Add to cart
                                </button>
                                {/* } */}
                            </div>
                        </form>
                    </div>

                    <div className="Product__description mx-4 sm:mx-16 my-8">
                        <p className="sm:text-[2rem]  text-[1.3rem] font-semibold">Description</p>
                        <p className="text-sm sm:text-base">{productDetails.productDescription}</p>
                    </div>
                    <div className="Product__features mx-4 sm:mx-16 my-8">
                        <p className="sm:text-[2rem]  text-[1.3rem] font-semibold" >Features</p>
                        {
                            productDetails.features.map((it, idx) => <p key={idx} className="text-sm sm:text-base">{it}</p>)
                        }
                    </div>
                    <div className="Product__table__specification mx-4 sm:mx-16 my-8 ">
                        <p className="sm:text-[2rem]  text-[1.3rem] font-semibold mb-4">Specifications</p>
                        {
                            productDetails.specifications.map((item, idx) =>
                                <div key={idx} className="flex justify-between max-[900px]:w-[80vw]  w-[54vw] border-x-2 border-t-2 border-gray-200 p-2">
                                    <p className="text-xs sm:text-base">{item.specificationName}</p>
                                    <p className="text-xs sm:text-base">{item.specificationValue}</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="Product__manual__buttons mx-4 sm:mx-16 my-8 flex sm:block flex-wrap gap-3 justify-center items-center ">
                        <button onClick={(e) => downloadManual(e)} className=" text-dabgreen  bg-gray-50 border border-dabgreen rounded-full mx-2 py-2 px-4">
                            Download Manual
                        </button>
                        <Link target='_blank' href="https://youtube.com" type="submit" className=" text-white hover:text-gray-50  border bg-dabgreen border-dabgreen rounded-full mx-2 py-2 px-4 hover:shadow-md">
                            YouTube Video
                        </Link>
                    </div>
                </div >
                : <svg className="animate-spin h-24 w-24 mr-3 text-dabgreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            }
        </div >
    );
};

export default Productdetailsview;
