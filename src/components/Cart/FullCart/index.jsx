import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import CartItemCard from './CartItemCard'
import { handleCheckOut } from '../../../helperFunction/checkout/cartcheckout'
import { getCookie } from '../../../cookie/index'
import { useRouter } from 'next/router'
import PaymentSucess from '../Payment/PaymentSuccess'
import AddressModal from '../../Modals/Address'

const Index = () => {
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const [paymentSuccess, setPaymentSuccess] = useState({
    showModal: false,
    orderId: null,
  });
  const [confirmOrder, setConfirmOrder] = useState({
    showModal: false,
    paymentMode: null,
  });
  const [cartArray, setCartArray] = useState([]);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    number: "",
    pincode: "",
    address: "",
    city: "",
  });
  const [addressIsSet, setAddressIsSet] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState({
    showModal: false,
    address: null,
  });

  async function fetchAddressData() {
    try {
      const response = await fetch('/api/address/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getCookie("userSession"),
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAddress(data.allData);
        setAddressIsSet(true);
      }
      else if(response.status === 201){
        setShowAddressModal({
          showModal:true,
          address:null
        })
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (addressIsSet) {
      // change price acc to city
      let newCartArray = cartArray.map((item, idx) => {
        let newItem = { ...item }; // create a new object with spread operator
        for (let i = 0; i < item.city.length; i++) {
          if (item.city[i].cityName.toLowerCase() === address.city.toLowerCase()) {
            newItem.productDeliveryCity = item.city[i].cityName; // modify the new object
            newItem.productDeliveryCityPrice = item.city[i].cityValue; // modify the new object
          }
        }
        return newItem;
      })

      setAmount(newCartArray.reduce((acc, item) => acc + (item.productDeliveryCityPrice ? +item.productDeliveryCityPrice : +item.productPrice) - (item.exchange ? +item.productWithExchange : 0) + (item.trolley ? +item.productWithTrolley : 0) - (item.couponDiscountPrice ? +item.couponDiscountPrice : 0), 0))
      setCartArray(newCartArray);
    }
  }, [addressIsSet])


  useEffect(() => {
    // checking if user is signed in
    if (getCookie("userSession") === '') {
      router.replace("/auth/login?redirect=cart");
    }
    setCartArray(cart);
    setAmount(cart.reduce((acc, item) => acc + (item.productDeliveryCityPrice ? +item.productDeliveryCityPrice : +item.productPrice) - (item.exchange ? +item.productWithExchange : 0) + (item.trolley ? +item.productWithTrolley : 0) - (item.couponDiscountPrice ? +item.couponDiscountPrice : 0), 0))
  }, [cart])

  // const handlePlus = (e, index) => {
  //   e.preventDefault();
  //   const prevQuantity = cartArray[index].quantity;
  //   setCartArray(
  //     cartArray.map((item, i) =>
  //       i === index
  //         ? { ...item, quantity: prevQuantity + 1 }
  //         : item
  //     )
  //   )
  // }

  // const handleMinus = (e, index) => {
  //   e.preventDefault();
  //   const prevQuantity = cartArray[index].quantity;
  //   if (prevQuantity > 1) {
  //     setCartArray(
  //       cartArray.map((item, i) =>
  //         i === index
  //           ? { ...item, quantity: prevQuantity - 1, }
  //           : item
  //       )
  //     )
  //   }
  //   else {
  //     alert("Quantity can't be 0");
  //   }
  // }

  // console.log(cartArray);

  // payment function
  const handlePayment = async (e) => {
    e.preventDefault();
    // if city is not present 
    const selected_city = address.city.toLowerCase();
    console.log(selected_city);
    for (let i = 0; i < cartArray.length; i++) {
      let cityArray = cartArray[i].city;
      let match = false;
      for (let index = 0; index < cityArray.length; index++) {
        let element = cityArray[index];
        if (element.cityName.toLowerCase() === selected_city.toLowerCase()) {
          match = true;
        }
      }
      if (!match) {
        console.log('i = ',i);
        alert(cartArray[i].productName + " is not available in " + selected_city);
        return;
      }
    }

    const userId = getCookie("userSession");
    try {
      const { status, orderId } = await handleCheckOut(address, amount, cartArray, confirmOrder.paymentMode, userId);
      if (status === 200) {
        setPaymentSuccess({
          showModal: true,
          orderId: orderId,
        });

      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // razorpay payment gateway
  React.useEffect(() => {
    fetchAddressData();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      console.log("razorpay script loaded");
    }
    script.onerror = () => {
      console.log("razorpay script not loaded");
    }
  }, []);

  const closePaymentSuccessModal = () => {
    setPaymentSuccess({
      showModal: false,
      orderId: null,
    });
    setConfirmOrder({
      showModal: false,
      paymentMode: null,
    });
    // remove cart items from local storage
    localStorage.removeItem("cart");
    router.reload();
  }

  const openConfirmOrder = (e, paymentMode) => {
    e.preventDefault();
    if (cartArray.length === 0) {
      alert("Cart is empty");
      return;
    };

    if (!address.city) {
      return alert('select your delivery city')
    }

    const selected_city = address.city;
    for (let i = 0; i < cartArray.length; i++) {
      let cityArray = cartArray[i].city;
      let match = false;
      for (let index = 0; index < cityArray.length; index++) {
        let element = cityArray[index];
        if (element.cityName.toLowerCase() === selected_city.toLowerCase()) {
          match = true;
        }
      }
      if (!match) {
        alert(cartArray[i].productName + " is not available in " + selected_city);
        return;
      }
    }


    if (paymentMode === 'online') {
      setConfirmOrder(prev => prev = { showModal: true, paymentMode: 'online' })
    } else {
      setConfirmOrder(prev => prev = { showModal: true, paymentMode: 'cod' })
    }
  }

  return (
    <div className="cart__full flex items-start justify-center lg:justify-between flex-wrap">
      <div className="cart__item__container my-8 space-y-3 sm:space-y-6">
        {
          cartArray.length !== 0 ? cartArray?.map((i, ind, arr) => <CartItemCard item={i} key={ind} ind={ind} />)
            : null
        }
      </div>
      <div className="cart__utility flex flex-col gap-5 sm:gap-10 my-8 mb-20">
        {/* <div className="cart__offers space-y-2 flex flex-col">
          <p className="offers__heading font-semibold text-xl mb-3">Offers</p>
          <input type="search" className="offer__search bg-[#e5e7eb] px-5 py-2 rounded-full" placeholder='Enter coupon code' />
          <p className="coupon__result text-green-600 text-xs">Offer Applied</p>
          <button className="offer__apply bg-dabgreen py-2 px-5 rounded-full w-min text-white">Apply</button>
        </div> */}
        <div className="choose__address space-y-2 flex flex-col ">
          <p className="offers__heading font-semibold text-xl mb-3">Choose Address</p>
          {address.name
            ? <div className="border-dabgreen border px-3 py-2 flex gap-3 bg-white rounded-xl items-start">
              <span className="address__icon p-3 rounded-full bg-[#6366f1]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-truck" viewBox="0 0 16 16">
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </span>
              <div className="address__text w-44 text-left flex-1">
                <p className="name">{address.name}</p>
                <p className="address text-gray-500 text-sm">{address.address}</p>
                <p className="phone text-gray-500 text-sm">{address.number} : {address.city}</p>
              </div>
            </div>
            : <p>no address found</p>
          }
          {
            address.name
              ? <button
                onClick={() => setShowAddressModal({
                  showModal: true,
                  address: address,
                })}
                className="offer__apply border-dabgreen border py-2 px-6 rounded-full w-min text-dabgreen flex gap-2 font-semibold items-center">
                <span className="icon text-xl"></span>
                <span className="icon">Edit</span>
              </button>
              : <button
                onClick={() => setShowAddressModal({
                  showModal: true,
                  address: null,
                })}
                className="offer__apply border-dabgreen border py-2 px-6 rounded-full w-min text-dabgreen flex gap-2 font-semibold items-center">
                <span className="icon text-xl">+</span>
                <span className="icon">ADD</span>
              </button>
          }
        </div>
        <div className="total__amount space-y-4 flex flex-col ">
          <p className="offers__heading font-semibold text-xl ">Total Amount</p>
          <div className="amount__container space-y-1">
            <p className="products__amount flex justify-between">
              <span className="text">Products</span>
              <span className="shipping__amount__number">₹{amount}</span>
            </p>
            <p className="shipping__amount flex justify-between">
              <span className="text">Shipping</span>
              <span className="shipping__amount__number">FREE</span>
            </p>
            <p className="shipping__amount flex justify-between border-t border-gray-400">
              <span className="text font-semibold">Total Price</span>
              <span className="shipping__amount__number font-semibold text-dabgreen">₹{amount}</span>
            </p>
          </div>
        </div>
        <div className="pay_now space-y-5 flex flex-col">
          <p className="offers__heading font-semibold text-xl ">We accept</p>
          <div className="payment__image__container flex flex-col flex-wrap gap-2 ">
            <div className="card flex gap-3 text-sm items-center border border-dabgreen px-3 py-2 rounded-lg">
              <span className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#10b97e" className="bi bi-credit-card-2-front" viewBox="0 0 16 16" >
                  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                  <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                </svg>
              </span>
              <p className='text flex flex-col'>
                <span>Card</span>
                <span className='text-xs'>Visa, MasterCard, RuPay, and Maestro</span>
              </p>
            </div>
            <div className="upi flex gap-3 text-sm items-center border border-dabgreen px-3 py-2 rounded-lg">
              <span className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#10b97e" className="bi bi-credit-card-2-front" viewBox="0 0 21 24">
                  <path d="M9.516 20.254l9.15-8.388-6.1-8.388-1.185 6.516 1.629 2.042-2.359 1.974-1.135 6.244zM12.809.412l8 11a1 1 0 0 1-.133 1.325l-12 11c-.707.648-1.831.027-1.66-.916l1.42-7.805 3.547-3.01-1.986-5.579 1.02-5.606c.157-.865 1.274-1.12 1.792-.41z"></path>
                  <path d="M5.566 3.479l-3.05 16.775 9.147-8.388-6.097-8.387zM5.809.412l7.997 11a1 1 0 0 1-.133 1.325l-11.997 11c-.706.648-1.831.027-1.66-.916l4-22C4.174-.044 5.292-.299 5.81.412z"></path>
                </svg>
              </span>
              <p className='text flex flex-col'>
                <span>UPI / QR</span>
                <span className='text-xs'>GPay, PhonePay, PayTM & More</span>
              </p>
            </div>
            <div className="Netbanking flex gap-3 text-sm items-center border border-dabgreen px-3 py-2 rounded-lg">
              <span className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#10b97e" className="bi bi-credit-card-2-front" viewBox="0 0 28 25" >
                  <path d="M4 15a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm6 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm6 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zM1 25a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2H1zm0-13c-.978 0-1.374-1.259-.573-1.82l10-7a1 1 0 0 1 1.146 0l1.426 1L13 9l1 3H1zm3.172-2h8.814l.017-3.378L11 5.221 4.172 10z"></path>
                  <path d="M20 16a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm3.663-7H27v2h-3.338c-.162 2.156-.85 4.275-2.057 6.352l-1.21-.704c1.084-1.863 1.703-3.744 1.863-5.648H13V7h9.258c-.16-1.904-.78-3.785-1.863-5.648l1.21-.704C22.814 2.725 23.501 4.844 23.663 7zm-4.058 7.648l-1.21.704C17 12.955 16.3 10.502 16.3 8c0-2.501.701-4.955 2.095-7.352l1.21.704C18.332 3.54 17.7 5.754 17.7 8c0 2.246.632 4.46 1.905 6.648z"></path>
                </svg>
              </span>
              <p className='text flex flex-col'>
                <span>Netbanking</span>
                <span className='text-xs'>All Indian banks</span>
              </p>
            </div>
          </div>
          <div className="paybutton flex gap-3 items-center flex-wrap justify-center">
            <p className="text-xl">₹{amount}</p>
            <button onClick={(e) => openConfirmOrder(e, 'online')} className="offer__apply bg-dabgreen py-2 px-4 rounded-full w-max text-gray-100 hover:text-white text-sm shadow-md">Pay Online</button>
            <button onClick={(e) => openConfirmOrder(e, 'cod')} className="offer__apply bg-dabgreen py-2 px-4 rounded-full w-max text-gray-100 hover:text-white text-sm shadow-md">Cash on Delivery</button>
          </div>
        </div>
      </div>
      {/* address modal */}
      {
        showAddressModal.showModal
          ?
          <div className="fixed top-0 left-0 z-50 backdrop-blur-sm w-full h-full overflow-y-scroll px-[2vw] ">
            <AddressModal address={address} setAddress={setAddress} setShowAddressModal={setShowAddressModal} cartArray={cartArray} setCartArray={setCartArray} setAmount={setAmount} addressIsSet={addressIsSet}/>
          </div>
          : null
      }

      {/* confirm order */}
      {
        confirmOrder.showModal
          ?
          <div className="fixed top-4 left-0 z-20 backdrop-blur-sm w-full h-full" >
            <div className="relative rounded-lg shadow bg-gray-700 w-max h-max mx-auto mt-[30vh]">
              <button onClick={(e) => setConfirmOrder(prev => prev = { ...prev, showModal: false, paymentMode: null })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-3 md:p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-7 h-7 md:w-14 md:h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-sm md:text-lg font-normal text-gray-500 dark:text-gray-400">Do you want to pay through {confirmOrder.paymentMode === 'online' ? 'Online' : 'Cash On Delivery'}</h3>
                <p className="mb-5 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400">Total amount to be paid ₹{amount}</p>
                <button onClick={(e) => handlePayment(e)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs md:text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  {confirmOrder.paymentMode === 'online' ? 'Yes, Pay Online' : 'Yes, Pay Cash On Delivery'}
                </button>
                <button onClick={(e) => setConfirmOrder(prev => prev = { ...prev, showModal: false, paymentMode: null })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-xs md:text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
            </div>
          </div>
          : null
      }

      {/* payment success modal */}
      {
        paymentSuccess.showModal
        && <div className="fixed top-4 left-0 z-20 backdrop-blur-sm w-full h-full" >
          <div className="relative rounded-lg shadow bg-gray-700 max-w-4xl h-max mx-auto mt-[5vh]">
            <PaymentSucess orderId={paymentSuccess.orderId} closePaymentSuccessModal={closePaymentSuccessModal} />
          </div>
        </div>
      }
    </div>
  )
}

export default Index