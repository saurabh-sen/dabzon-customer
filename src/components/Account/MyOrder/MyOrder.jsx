import React from "react";
import Image from "next/image";
import myorder from "../../../../public/account/myorder.svg";
import filterBut from "../../../../public/account/button.svg";
import without_exchange from "../../../../public/account/without_exchange.svg";
import with_trolley from "../../../../public/account/with_trolley.svg";
import product from '../../../../public/account/product.svg'
import rate from '../../../../public/account/rate.svg'
import { useRouter } from "next/router";

export default function MyOrder({ setRight, profileData }) {

  const router = useRouter();

  const [prevOrders, setPrevOrders] = React.useState([]);
  const [productsModal, setProductsModal] = React.useState({
    showModal: false,
    products: [],
  });

  const [confirmCancelOrder, setConfirmCancelOrder] = React.useState({
    showModal: false,
    orderId: "",
  });

  const cancelOrder = (e) => {
    e.preventDefault();
    console.log(confirmCancelOrder.orderId)
    fetch(`/api/user/cancelOrder?orderId=${confirmCancelOrder.orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setConfirmCancelOrder(prev => prev = { orderId: '', showModal: false });
          router.reload();
        }
        alert(data.msg)
      })
  }

  React.useEffect(() => {
    fetch(`/api/user/getUserOrders?userId=${profileData.userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) setPrevOrders(data.data);
      });
  }, []);

  console.log(productsModal.products)

  return (
    <div className="flex flex-col border-2 bg-white rounded-xl px-2 md:p-6 mb-20 sm:mb-0 w-full overflow-hidden">
      {/* search bar and filter */}
      <button className="block md:hidden" onClick={() => setRight(9)}>
        {/* go back svg */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="flex justify-center md:justify-between flex-wrap gap-3">
        <button className="group search__container md:flex flex flex-row gap-3 bg-[#f3f4f6] rounded-3xl px-4 py-1 sm:py-2  items-center relative">
          <svg
            className="sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="gray-900"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            className="border-0 outline-0 bg-transparent text-sm text-gray-900"
            type="search"
            name="search"
            id="search"
            placeholder="Search your order here"
          />
          <div
            className="recent_search_and__search__results bg-white rounded-md shadow-md absolute top-[70px] left-0 hidden group-focus-within:block w-full z-20"
            autoComplete="off"
          ></div>
        </button>
        <Image
          className="w-20 md:w-28 h-auto "
          loading="lazy"
          src={filterBut}
          alt="Image is loading..."
          width={1000}
          height={1000}
        />
      </div>

      {/* orders */}
      {
        prevOrders.length === 0
          ? <p className="mx-auto">Purchase some item to display here</p>
          : prevOrders.map((order, index) =>
            <div key={index} className="flex mt-4 bg-gray-100 rounded-xl justify-center md:justify-between flex-wrap md:flex-nowrap">
              <div className="flex w-full gap-1 md:gap-3 justify-between">
                <Image className="Left___most___image w-32 h-32 md:h-40 md:w-auto p-2" loading="lazy" src={product} alt="Image is loading..." width={150} height={150} />
                <div className="flex flex-col space-y-1 md:space-y-2 justify-center m-2">
                  <p className="truncate text-xs text-gray-900 font-medium w-40 break-words">
                    {order.cartArray.length === 1 ? order.cartArray[0].productName : order.cartArray[0].productName + ' and ' + (order.cartArray.length - 1) + ' more'}
                  </p>
                  <p className="text-dabgreen text-base md:text-xl font-semibold ">₹{order.amount}</p>
                  <p className=" text-base font-semibold ">{order.paymentMode === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                  <p className=" text-base  ">{(order.orderStatus === 'shipped' || order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') ? '' : order.expectedDelivery}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 justify-center m-2">
                <p className="text-sm text-gray-800 flex gap-1">
                  <span>Status: </span>
                  <span className={`${order.orderStatus === 'cancelled' ? 'text-red-800' : 'text-dabgreen'} uppercase`}>{order.orderStatus}</span>
                </p>
                <p className="tex-sm text-[#3b82f6] flex gap-1 cursor-pointer" onClick={() => alert('rate')}>
                  <Image src={rate} className='w-5 h-5' alt="loading.." width={'auto'} height={'auto'} />
                  <span>Rate</span>
                </p>
                <div className="">
                  {
                    order.orderStatus === 'cancelled'
                      ? <button onClick={() => setConfirmCancelOrder(prev => prev = { showModal: true, orderId: order._id })} className="text-sm text-red-800 bg-red-200 rounded-full mt-3 py-2 px-5 w-max">
                        cancelled
                      </button>
                      : order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ?
                        <button onClick={(e) => setProductsModal(prev => prev = { products: order.cartArray, showModal: true })} className="text-sm text-gray-50 bg-dabgreen rounded-full mt-3 py-2 px-5 w-max">
                          View details
                        </button>
                        :
                        <button onClick={() => setConfirmCancelOrder(prev => prev = { showModal: true, orderId: order._id })} className="text-sm text-gray-800 bg-red-200 rounded-full mt-3 py-2 px-5 w-max">
                          {order.paymentMode === 'cod' ? 'Cancel Order' : 'Cancel & Refund'}
                        </button>
                  }

                </div>
              </div>
            </div>)
      }

      {/* modal */}
      {productsModal.showModal && (
        // productsModal.data pe map krke products show krna hai
        <div className="fixed top-4 left-0 z-20 backdrop-blur-sm w-full h-full overflow-hidden">
          <div className="overflow-y-scroll min-h-[50vh] max-h-[90vh] bg-white rounded-lg border-2 border-dabgreen max-w-5xl max-[913px]:mx-4 mx-auto mt-[15vh] flex flex-col ">
            <span onClick={(e) => setProductsModal(prev => prev = { ...prev, showModal: false })} className="icons__cross sticky top-2 right-3 z-10 flex ml-auto bg-dabgreen p-2 rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>

            <div className="relative z-0 max-w-4xl mx-auto px-8 pb-32 md:pb-0 ">
              {productsModal.products.map((item, index) => (
                <div key={index} className="productDetails flex flex-wrap gap-2 justify-center md:justify-between pb-4 my-4 border-b border-gray-300">
                  <div className="productImage">
                    <Image
                      className="w-70 aspect-auto"
                      src={item.productImage}
                      alt="product"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="productData flex flex-col flex-wrap justify-center">
                    <div className="nameAndPrice flex flex-wrap gap-2 justify-between max-[433px]:flex-col">
                      <p className="name flex gap-2 mr-4 ">
                        <span className="text-gray-500">Name:</span>
                        <span className="text-gray-900">{item.productName}</span>
                      </p>
                      <p className="price flex gap-2">
                        <span className="text-gray-500">Price:</span>
                        <span className="text-gray-900">₹{item.productPrice}</span>
                      </p>
                    </div>
                    <div className="capacityAndCategory flex flex-wrap gap-2 justify-between max-[433px]:flex-col">
                      <p className="name flex gap-2 mr-4 ">
                        <span className="text-gray-500">Capacity:</span>
                        <span className="text-gray-900">{item.productCapacity}</span>
                      </p>
                      <p className="price flex gap-2">
                        <span className="text-gray-500">Category:</span>
                        <span className="text-gray-900">{item.productCategory}</span>
                      </p>
                    </div>
                    <div className="brandAndCity flex flex-wrap gap-2 justify-between max-[433px]:flex-col">
                      <p className="name flex gap-2 mr-4 ">
                        <span className="text-gray-500">Brand:</span>
                        <span className="text-gray-900">{item.productBrand}</span>
                      </p>
                      <p className="price flex gap-2">
                        <span className="text-gray-500">Delivery City:</span>
                        <span className="text-gray-900">{item.productDeliveryCity}</span>
                      </p>
                    </div>
                    <div className="exchangeAndTrolley flex flex-wrap gap-2 justify-between max-[433px]:flex-col">
                      {item.productWithExchange && <div className="flex">
                        <Image
                          className="h-7 w-auto"
                          loading="lazy"
                          src={without_exchange}
                          alt="Image is loading..."
                          width={1000}
                          height={1000}
                        />
                        <p className="flex text-gray-900 text-xs md:text-sm items-center ml-1 md:ml-2">
                          WITH EXCHANGE
                        </p>
                      </div>}
                      {item.productWithTrolley && <div className="flex">
                        <Image
                          className="h-7 w-auto"
                          loading="lazy"
                          src={with_trolley}
                          alt="Image is loading..."
                          width={1000}
                          height={1000}
                        />
                        <p className="flex text-gray-900 text-xs md:text-sm items-center ml-1 md:ml-2">
                          WITH TROLLEY
                        </p>
                      </div>}
                    </div>
                    {item.productCouponCode && <div className="coupon flex flex-wrap gap-2 justify-between max-[433px]:flex-col">
                      <p className="name flex gap-2 mr-4 ">
                        <span className="text-gray-500">Coupon Code:</span>
                        <span className="text-gray-900">{item.productCouponCode}</span>
                      </p>
                      <p className="price flex gap-2">
                        <span className="text-gray-500">
                          Coupon Discount:
                        </span>
                        <span className="text-gray-900">-{item.productCouponCodeDiscount}</span>
                      </p>
                    </div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* confirm modal */}
      {
        confirmCancelOrder.showModal
          ?
          <div className="fixed top-4 left-0 z-20 backdrop-blur-sm w-full h-full" >
            <div className="relative rounded-lg shadow bg-gray-700 w-max h-max mx-auto mt-[30vh]">
              <button onClick={(e) => setConfirmCancelOrder(prev => prev = { orderId: '', showModal: false })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close</span>
              </button>
              <div className="p-3 md:p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-7 h-7 md:w-14 md:h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-sm md:text-lg font-normal text-gray-500 dark:text-gray-400">Do you want to cancel the order</h3>
                {/* <p className="mb-5 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400">Total amount to be paid ₹{amount}</p> */}
                <button onClick={(e) => cancelOrder(e)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs md:text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Yes, I want to cancel
                </button>
                <button onClick={(e) => setConfirmCancelOrder(prev => prev = { orderId: '', showModal: false })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-xs md:text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, Do not cancel</button>
              </div>
            </div>
          </div>
          : null
      }

    </div>
  );
};
