import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId } = await req.body;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("user");
      const response = await collection.findOne({ email: userId });
      if(response === null) return res.status(404).json({ data: [], msg: "User not found" });
      return res.status(200).json({ data: response, msg: "User found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data:[], msg: error });
    }
  }
}
