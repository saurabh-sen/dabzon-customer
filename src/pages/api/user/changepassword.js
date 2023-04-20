import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {email, password} = await req.body;
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("user");
            const response = await collection.updateOne(
                {"email": email},
                { $set :{"password": password}}
            );
            if(response.modifiedCount !== 0){
                console.log(response);
                return res.status(200).json({msg:"password changed"});
            }
            else{
                return res.status(201).json({msg:"The user doesn't exist"});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error})
        }
    }
}