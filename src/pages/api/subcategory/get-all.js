import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
            let { category } = await req.body;
            if(category === null || category === undefined || category === ""){
                return res.status(400).json({ allData: "Please provide category" });
            }
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("product");
            const doc = await collection.find({ "productCategory": category }, { "productSubcategory": 1, "image1": 0 }).toArray();
            console.log("docs", category);
            if (doc !== null) {
                return res.status(200).json({ allData: doc });
            }
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({ allData: error })
        }
    }
}