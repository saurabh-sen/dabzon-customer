import clientPromise from "../../../../backend/database/connect";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const body = await req.body;
        const this_email = body.email;
        const client = await clientPromise;
        const db = await client.db("dabzon");
        const collection = await db.collection("address");
        const response = await collection
        .updateOne({email: this_email}, {$setOnInsert : { ...body }}, {upsert : true});
        if (response.acknowledged) {
          // console.log(" !!! Product created !!!");
          return res.status(200).json({msg: 'success', status: 200})
        }else return res.status(500).json({msg: 'failed to save', status: 500})
      }
      catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
      }
    }
    else{
        res.status(405).send({ msg: 'Only POST requests allowed' })
    }
  }
  