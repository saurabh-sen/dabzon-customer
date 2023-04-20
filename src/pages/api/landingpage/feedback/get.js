import clientPromise from "../../../../../backend/database/connect";
export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("feedback");
            const docs=await collection.find().toArray();
            if(docs.length !== 0){ //spelling
                return res.status(200).json({ allData:docs, msg:"successfully fetched all feedback data"});
            }
            else{
                return res.status(501).json({ allData:"", msg:"no data found"});
            }
          }
          catch (error) {
            console.log(error);
            return res.status(500).json({ allData:"", msg: error })
          }
    }
}