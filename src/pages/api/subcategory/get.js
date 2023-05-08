import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const {category,subcategory} = await req.query;
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("product");
            const doc = await collection.find({ "productCategory": category , productSubcategory: subcategory}).toArray();
            console.log(doc);
            if (doc !== null) {
                return res.status(200).json({ allData: doc });
            }
        } catch (error) {
            return res.status(500).json({ allData: error })
        }
    }
}