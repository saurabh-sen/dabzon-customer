import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = await req.query;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("orders");
      const response = await collection.find({ userId: userId }).toArray();
      if(response.length > 0) return res.status(200).json({ data: response, msg: "User found", status: 200 }); 
      return res.status(404).json({ data: [], msg: "User not found", status: 404 });      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data:[], msg: error });
    }
  }
}
