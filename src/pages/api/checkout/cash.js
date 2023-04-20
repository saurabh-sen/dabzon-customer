import clientPromise from "../../../../backend/database/connect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.body;
      const client = await clientPromise;
      const db = client.db("dabzon");
      const orders = db.collection("orders");
      const order = await orders.insertOne(body);
      console.log(order);
      if(order.acknowledged)return res.status(200).json({ status: 200, orderId: order.insertedId });
      return res.status(500).json({ status: 500, orderId: null });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: error });
    }
  }
}
