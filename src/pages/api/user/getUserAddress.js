import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = await req.query;
      console.log("userId",userId)
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("address");
      const response = await collection.findOne({ email: userId });
      if(response === null) return res.status(404).json({ status: 404, data: [], msg: "User not found" });
      return res.status(200).json({ status:200, data: response, msg: "address found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data:[], msg: error });
    }
  }
}
