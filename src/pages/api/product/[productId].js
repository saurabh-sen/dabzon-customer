import clientPromise from "../../../../backend/database/connect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // get product data
      const { productId } = req.query;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("product");
      const dataOfProduct = await collection.findOne({
        _id: new ObjectId(`${productId}`),
      });

      // capture brand and category from data
      const capacityCollection = await db.collection("capacity");
      const dataOfCapacity = await capacityCollection
        .find({
          brand: dataOfProduct.productBrand,
          category: dataOfProduct.productCategory,
        })
        .toArray();

      // return capacity data and product data
      return res
        .status(200)
        .json({ capacityData: dataOfCapacity, productData: dataOfProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: error });
    }
  }
}
