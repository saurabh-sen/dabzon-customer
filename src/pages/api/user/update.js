import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, image, name, email, gender, number, password } = await req.body;
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("user");

      // Find the document with the matching email and update the name if it exists
      const result = await collection.updateOne({ email: userId }, 
          {
            $set: {
              name: name,
              email: email,
              gender: gender,
              number: number,
              password:password,
              image: image ? image : "",
            },
          },
          { upsert: false }
        );

        // console.log(result)
      if (result) {
        return res.status(200).json({ msg: "user is already present" });
      } else {
        return res.status(200).json({ msg: "user is not present" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }
}
