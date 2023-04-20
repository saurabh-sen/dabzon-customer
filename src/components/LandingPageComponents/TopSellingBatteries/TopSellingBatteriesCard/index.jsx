import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setCart, deleteFromCart } from "../../../../reduxStore/Slices/Cart/CartSlice";
import empty__heart from '../../../../../public/icons/empty__heart.svg'
import full__heart from '../../../../../public/icons/full__heart.svg'

const Card = ({ item }) => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector(state => state.cart);

  const handleAddToCart = (e, item) => {
    let cartItem = {
      productBrand: item.productBrand,
      productShortDescription: item.productShortDescription,
      productCapacity: item.productCapacity,
      productCategory: item.productCategory,
      productCouponCode: null,
      productCouponCodeDiscount: null,
      productDeliveryCity: null,
      productDeliveryCityPrice: null,
      productFakeDiscount: item.fakeDiscount,
      productId: null,
      productImage: item.image1,
      productName: item.productName,
      productPayingPriceAfterCoupon: null,
      productPrice: item.price,
      productWithExchange: null,
      productWithTrolley: null,
      _id: item._id,
      quantity: 1,
      city: item.city
    }
    dispatch(setCart(cartItem))
  }

  const handleBuyNow = (e) => {
    e.preventDefault();
    let cartItem = {
      productBrand: item.productBrand,
      productShortDescription: item.productShortDescription,
      productCapacity: item.productCapacity,
      productCategory: item.productCategory,
      productCouponCode: null,
      productCouponCodeDiscount: null,
      productDeliveryCity: null,
      productDeliveryCityPrice: null,
      productFakeDiscount: item.fakeDiscount,
      productId: null,
      productImage: item.image1,
      productName: item.productName,
      productPayingPriceAfterCoupon: null,
      productPrice: item.price,
      productWithExchange: null,
      productWithTrolley: null,
      _id: item._id,
      quantity: 1,
    }
    dispatch(setCart(cartItem));
    router.push('user/cart')
  }

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    dispatch(deleteFromCart(id))
  }

  return (
    <div className="singleProductCard cursor-pointer border-2 border-gray-200 shadow-md w-[295px] rounded-xl ">

      <div className="singleProductCard__image__container bg-gray-200 rounded-t-xl relative w-full h-[250px] px-2">
        <div className="image__text__icon flex justify-between py-2 px-4">
          <p className="cursor-pointer image__text border-2 text-dabgreen border-dabgreen rounded-full text-center px-3 py-[6px] h-min text-sm">
            {item.productCategory}
          </p>
          <button className="group rounded-full w-10 h-10 bg-gray-100 border-0 inline-flex items-center justify-center text-gray-900 ml-4 focus:text-red-600 hover:text-red-600">
            <Image width={20} height={20} src={empty__heart} alt="empty__heart" className="block group-hover:hidden group-focus-within:hidden " />
            <Image width={20} height={20} src={full__heart} alt="full__heart" className="hidden group-hover:block group-focus-within:block" />
          </button>
        </div >
        <Image onClick={() => router.push(`/product/${item._id}`)} className="pb-2 m-auto w-60 aspect-video" loading="lazy" src={item.image1} width={100} height={100} alt="Image is loading..." />
        {
          item.fakeDiscount
            ? <p className="discount text-white border border-white px-3 py-1 bg-[#DC2626] rounded-3xl absolute left-1 bottom-1 text-[10px] md:text-xs">{item.fakeDiscount}% OFF</p>
            : null
        }
      </div>

      <div className="singleProductCard__descripion">
        <div className="singleProductCard__title p-3 space-x-2 truncate text-xs md:text-sm">
          <span className="text-gray-900 ">{item.productName}</span>
          <span className="text-gray-500  ">{item.productShortDescription}</span>
        </div>

        <div className="singleProductCard__price border-gray-200 pb-1 flex justify-start items-center pr-3">
          <span className="text-dabgreen text-lg md:text-2xl p-3 font-semibold">₹{item.price}</span>
          <span className="text-gray-500 text-sm md:text-lg line-through">₹{Math.round((item.price / (1 - (item.fakeDiscount / 100))))}</span>
        </div>

        <div className="singleProductCard__capacity__and__item">
          <div className="flex gap-1 justify-between mx-3 border-t-2 py-2 flex-wrap text-base">
            <p>
              <span className="text-dabgreen mr-1">Capacity:</span><span className="text-gray-900 text-xs truncate">{item.productCapacity}</span>
            </p>
            <p>
              <span className="text-dabgreen mr-1">Warranty:</span><span className="text-gray-900 text-xs truncate">{item.warranty}</span>
            </p>
          </div>
        </div>

        {+item.trolleyPrice
          ? <div className="singleProductCard__with__trolly flex justify-between mx-3 my-1">
            <span className="text-gray-900 text-xs md:text-sm">With Trolly</span><span className="text-dabgreen text-sm md:text-lg font-semibold">₹{item.trolleyPrice}</span>
          </div>
          : null
        }

        {+item.exchangeAmount
          ? <div className="singleProductCard__without__old__battery flex justify-between mx-3 my-1">
            <span className="text-gray-900 text-xs md:text-sm">With Exchange</span><span className="text-dabgreen text-sm md:text-lg font-semibold">₹{item.exchangeAmount}</span>
          </div>
          : null
        }

        <div className="flex justify-between mx-3 my-4">
          {/* { cart.find((cart__item) => cart__item._id === item._id) !== undefined ? <> */}
          {/* <button onClick={(e) => handleBuyNow(e, item)} className="text-xs hover:bg-dabgreen focus:bg-dabgreen hover:text-white focus:text-white md:text-sm border-dabgreen border text-dabgreen rounded-full px-4 py-[6px]">Buy now</button>
                <button onClick={(e) => handleRemoveFromCart(e, item._id)} className="text-xs bg-red-600 focus:bg-red-500 text-white  md:text-sm border-red-500 border rounded-full px-4 py-[6px]">Remove</button> */}
          {/* </> */}
          {/* : <> */}
          <button onClick={(e) => handleBuyNow(e, item)} className="text-xs hover:bg-dabgreen focus:bg-dabgreen hover:text-white focus:text-white md:text-sm border-dabgreen border-2 text-dabgreen rounded-full px-4 py-[6px]">Buy now</button>
          <button onClick={(e) => handleAddToCart(e, item)} className="text-xs bg-dabgreen text-white md:text-sm rounded-full px-4 py-[6px] hover:shadow-lg">Add to cart</button>
          {/* </> }  */}
        </div>
      </div>

    </div>
  );
};

export default Card;
