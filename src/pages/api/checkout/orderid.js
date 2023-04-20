import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const { payment } = await req.body;

      var options = {
        amount: payment, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        return res.status(200).json({ status: 200, orderId: order.id });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: error });
    }
  }
}
