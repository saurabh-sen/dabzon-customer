import { ObjectId } from "mongodb";
import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { orderId } = await req.query;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("orders");
      const response = await collection.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { orderStatus: "cancelled" } }
      );
      if (response.modifiedCount === 1) {
        return res
          .status(200)
          .json({ data: [], msg: "Order cancelled successfully", status: 200 });
      }
      return res
        .status(500)
        .json({ data: [], msg: "Order not cancelled", status: 500 });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: [], msg: error });
    }
  }
}
