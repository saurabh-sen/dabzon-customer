import React from 'react'
import deleteCartItem from "../../../../../public/icons/deleteCartItem.svg"
import { deleteFromCart } from '../../../../reduxStore/Slices/Cart/CartSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Index = ({ item, ind }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    // console.log(item)
    const totalPrice = (item.productDeliveryCityPrice ? +item.productDeliveryCityPrice : +item.productPrice) - (item.exchange ? +item.productWithExchange : 0) + (item.trolley ? +item.productWithTrolley : 0) - (item.couponDiscountPrice ? +item.couponDiscountPrice : 0);

    return (
        <div className="cart__item bg-white flex p-2 m-2 sm:p-8 rounded-xl gap-2 sm:gap-5 items-center relative ">
            <span onClick={() => dispatch(deleteFromCart(ind))} className="cart__item__remove__icon p-2 absolute top-3 right-3 cursor-pointer bg-gray-100 hover:bg-red-200 rounded-full">
                <Image className='' src={deleteCartItem} alt='deleteCartItem' width={20} height={20} />
            </span>
            <div onClick={() => router.replace(`/product/${item._id}`)} className="image__container w-24 h-24 p-3 sm:w-48 sm:h-48 bg-[#f3f4f6] rounded-xl grid place-items-center box-border object-contain aspect-square">
                <Image src={item.productImage} alt='cart_item_bg' width={100} height={100} className='w-auto h-auto aspect-auto' />
            </div>
            <div className="item__text__container space-y-1 sm:space-y-2 text-xs sm:text-sm w-full">
                <p className="item__title text-base sm:text-lg font-semibold">{item.productName}</p>
                <p className="item__title text-xs truncate">{item.productShortDescription}</p>
                {item.productDeliveryCity
                    ? <p className="item__title text-xs truncate">Delivery in {item.productDeliveryCity}</p>
                    : <p className="item__title text-xs text-red-600 ">No city selected</p>
                }


                <div className="item__exchange__trolley flex gap-1 sm:gap-6 ">
                    {
                        item.exchange
                            ? <p className="exchnage flex gap-1 sm:gap-2 items-center">
                                <span className="exchange__icon bg-[#f43f5e] p-2 sm:p-2.5 rounded-full">
                                    <svg className='w-2 sm:w-3 aspect-square' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='white'>
                                        <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" /></svg>
                                </span>
                                <span className="exchange__text uppercase text-xs">With exchange</span>
                            </p>
                            : null
                    }
                    {
                        item.trolley
                            ? <p className="trolley flex gap-1 sm:gap-2 items-center">
                                <span className="exchange__icon bg-dabgreen p-2 sm:p-2.5 rounded-full">
                                    <svg className='w-2 sm:w-3 aspect-square' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='white'>
                                        <path d="M0 32C0 14.3 14.3 0 32 0H48c44.2 0 80 35.8 80 80V368c0 8.8 7.2 16 16 16H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H541.3c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16H253.3c1.8 5 2.7 10.4 2.7 16c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-5.6 1-11 2.7-16H144c-44.2 0-80-35.8-80-80V80c0-8.8-7.2-16-16-16H32C14.3 64 0 49.7 0 32zM432 96V56c0-4.4-3.6-8-8-8H344c-4.4 0-8 3.6-8 8V96h96zM288 96V56c0-30.9 25.1-56 56-56h80c30.9 0 56 25.1 56 56V96 320H288V96zM512 320V96h16c26.5 0 48 21.5 48 48V272c0 26.5-21.5 48-48 48H512zM240 96h16V320H240c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                                    </svg>
                                </span>
                                <span className="exchange__text uppercase text-xs">With trolley</span>
                            </p>
                            : null
                    }
                </div>

                {/* <div className="item__item__count bg-[#f3f4f6] space-x-5 flex w-min py-1 px-2 sm:py-2 sm:px-4 font-semibold items-center rounded-lg" >
                    <span onClick={(e) => handlePlus(e, ind)} className="count__increment cursor-pointer text-lg sm:text-2xl">+</span>
                    <span className="count__text text-sm sm:text-xl">{item.quantity}</span>
                    <span onClick={(e) => handleMinus(e, ind)} className="count__decrement cursor-pointer text-lg sm:text-2xl">-</span>
                  </div> */}

                <div className="item__price flex flex-col">
                    <div className="originalPrice flex justify-between">
                        <p className="discounted__price text-lg flex items-center">
                            <span className="price__text text-sm">Price</span>
                        </p>
                        <p className="discounted__price flex items-center gap-2">
                            <span className="price__text text-xl text-dabgreen"> ₹{item.productDeliveryCityPrice ? +item.productDeliveryCityPrice : +item.productPrice}</span>
                            <span className="price__text text-sm text-gray-500 line-through"> ₹{Math.round((item.productDeliveryCityPrice ? +item.productDeliveryCityPrice : +item.productPrice) / (1 - (+item.productFakeDiscount / 100)))}</span>
                        </p>
                    </div>
                    {item.trolley && <div className="withtrolley flex justify-between">
                        <p className="discounted__price text-lg flex items-center">
                            <span className="price__text text-sm">Trolley</span>
                        </p>
                        <p className="discounted__price flex items-center gap-2">
                            <span className="price__text text-xl text-dabgreen font-semibold"> +  ₹{item.productWithTrolley}</span>
                        </p>
                    </div>}
                    {item.productCouponCode && <div className="coupon flex justify-between">
                        <p className="coupon__price text-lg flex items-center">
                            <span className="coupon__text text-sm">Coupon Applied</span>
                        </p>
                        <p className="discounted__price flex items-center gap-2">
                            <span className="price__text text-xl text-dabgreen font-semibold">- ₹{item.couponDiscountPrice}</span>
                            <span className="price__text text-xs text-gray-500 ">{item.productCouponCode}</span>
                        </p>
                    </div>}
                    {item.exchange && <div className="withexchange flex justify-between">
                        <p className="discounted__price text-lg flex items-center">
                            <span className="price__text text-sm">With Exchange</span>
                        </p>
                        <p className="discounted__price flex items-center gap-2">
                            <span className="price__text text-xl text-dabgreen font-semibold">- ₹{item.productWithExchange}</span>
                        </p>
                    </div>}
                    <div className="total price flex justify-between border-t border-gray-400">
                        <p className="discounted__price font-semibold text-lg flex items-center">
                            <span className="price__text text-sm">Total Price</span>
                        </p>
                        <p className="discounted__price flex items-center gap-2">
                            <span className="price__text text-xl text-dabgreen font-semibold"> ₹{totalPrice}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Index