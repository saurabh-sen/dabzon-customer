import crypto from "crypto";
import clientPromise from "../../../../backend/database/connect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { order } =
        await req.body;
      let body = order.razorpay_order_id + "|" + order.razorpay_payment_id;

      // key secret is the secret key of the razorpay account
      var expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
      console.log("sig received ", order.razorpay_signature);
      console.log("sig generated ", expectedSignature);

      if (expectedSignature === order.razorpay_signature) {
        // save order to db
        const client = await clientPromise;
        const db = await client.db("dabzon");
        const collection = await db.collection("orders");
        const response = await collection.insertOne(order);
        if (response.acknowledged) return res.status(201).json({ status: 201, signatureIsValid: "true", msg: "payment successful and order saved to db" });
        else return res.status(500).json({ status: 500, signatureIsValid: "true", msg: "payment successful but order not saved to db" });
      } else return res.status(500).json({ status: 500, signatureIsValid: "false" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: error });
    }
  }
}
