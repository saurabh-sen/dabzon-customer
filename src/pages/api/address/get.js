import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
    if(req.method === 'POST'){
        try {
            const { userId } = await req.body;
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("address");
            const docs= await collection.findOne({ email: userId });
            if(docs){
                return res.status(200).json({ allData:docs, msg:"successfully fetched address data"});
            }
            else{
                return res.status(201).json({ allData:"", msg:"no data found"});
            }
          }
          catch (error) {
            console.log(error);
            return res.status(500).json({ allData:"", msg: error })
          }
    }
}