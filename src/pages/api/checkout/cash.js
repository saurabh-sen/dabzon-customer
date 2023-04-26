import clientPromise from "../../../../backend/database/connect";
import { orderConfirmationMail } from "../mail/orderconfirm";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.body;
      body["createdAt"]=new Date();
      const client = await clientPromise;
      const db = client.db("dabzon");
      const orders = db.collection("orders");
      const order = await orders.insertOne(body);
      if(order.acknowledged){
        orderConfirmationMail(body);
        //stock decrement
        body.cartArray.map(async(item) =>{
          await db.collection("product").updateOne({_id:new Object(item._id)},{$inc: {stock: -1} });
        })
        
        return res.status(200).json({ status: 200, orderId: order.insertedId });
      }
      return res.status(500).json({ status: 500, orderId: null });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: error });
    }
  }
}
