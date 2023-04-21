import logo from "../../../public/icons/logo.svg";

const verifyPayment = async (
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  cartArray,
  amount,
  userId,
  paymentMode,
  address
) => {
  let order = {
    cartArray: cartArray,
    userId: userId,
    amount: amount,
    paymentMode: paymentMode,
    address: address,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
    orderStatus: "pending",
    sales: false
  };

  const res = await fetch("/api/checkout/verifypayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: order }),
  });
  const data = await res.json();

  if (data.signatureIsValid) return true;
  else return false;
};

export const handleCheckOut = async (
  address,
  amount,
  cartArray,
  paymentMode,
  userId
) => {
  // save order in database and return document id for tracking with status

  // cash on delivery
  if (paymentMode === "cod") {
    return new Promise(async (resolve, reject) => {
      const res = await fetch("/api/checkout/cash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
          amount: amount,
          cartArray: cartArray,
          paymentMode: paymentMode,
          userId: userId,
          orderStatus: "pending",
          sales: false,
        }),
      });
      const { status, orderId } = await res.json();
      if(res.status === 200)resolve({ status, orderId });
      else reject({ status: "payment failed", orderId: null });
    });
  } else {
    // online payment
    return new Promise(async (resolve, reject) => {
      console.log("please wait for orderid");
      const res = await fetch("/api/checkout/orderid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment: +amount * 100 }),
      });
      const { status, orderId } = await res.json();
      console.log("order_id", orderId);

      var options = {
        key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: +amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Dabzon",
        description: "product purchase Transaction dabzon",
        image: logo,
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          console.log(response);
          if (verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, cartArray, amount, userId, paymentMode, address))resolve({ status, orderId: response.razorpay_payment_id });
          else reject({ status: "payment failed", orderId: null });
        },
        theme: {
          color: "#10b981",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log(response.error);
      });
      rzp1.open();
    });
  }
};
