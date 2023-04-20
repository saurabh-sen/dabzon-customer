import clientPromise from "../../../../../backend/database/connect";
export default async function handler(req, res) {
    if(req.method === 'GET'){
        try {
            // console.log("hello g")
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("faq");
            const docs= await collection.find().toArray();
            // console.log(docs);
            if(docs.length !== 0){ //spelling
                return res.status(200).json({ allData:docs, msg:"successfully fetched all category data"});
            }
            else{
                return res.status(501).json({ allData:"", msg:"no data found"});
            }
            // return res.status(200).json({ allData:"great job", msg:"successfully fetched all category data"});
          }
          catch (error) {
            console.log(error);
            return res.status(500).json({ allData:"", msg: error })
          }
    }
}