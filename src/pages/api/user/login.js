// import { use } from "react";
import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {email, password} = await req.body;
            const client = await clientPromise;
            const db = await client.db("dabzon");
            const collection = await db.collection("user");
            //check if user's email and password are correct
            const response = await collection.findOne({"email": email, "password": password});
            console.log(response);
            if (response != null) {
                return res.status(200).json({ msg: "user logged in",body: response });
            }
            else {
                return res.status(201).json({ msg: "wrong email or password", body:"" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error, body:""  })
        }
    }
}