import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
    
    if(req.method === 'GET'){
        try {
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("product");
            const doc=await collection.find({"topSelling": true}).toArray();
            if(res!==null){
                res.status(200).json({ data: doc });  
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ data:error })
        }
    }
}