import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {userId, address} = await req.body;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("address");
      const response = await collection.updateOne({email: userId}, {$set: { name: address.name, number: address.number, pincode: address.pincode, address: address.address, city: address.city, email: address.email }});
      if(response === null) return res.status(404).json({ status: 404, data: [], msg: "User not found" });
      return res.status(200).json({ status:201, data: response, msg: "User found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data:[], msg: error });
    }
  }
}
