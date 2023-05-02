import clientPromise from "../../../../backend/database/connect";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
    if(req.method === 'GET'){
        
        try {
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("carousel");
        
            const docs=await collection.findOne({_id: new ObjectId("644fc12fcc421f8e4922fc50")});
            if(docs.length !== 0){ //spelling
                return res.status(200).json({ allData:docs, msg:"successfully fetched all top offers data"});
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