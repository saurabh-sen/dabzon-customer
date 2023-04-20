import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { searchquery } = await req.query;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("product");
      // below code is for partial match of search query when enter hit in search bar
      const response = await collection.find({ tags: { $regex: searchquery } }).toArray()

      // below code is for exact match of search query when enter hit in search bar
      // const response = await collection.find({ tags: { $elemMatch: { $eq: searchquery } } }).toArray()
      // console.log(response)
      return res.status(200).json({ msg: response });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }
}
