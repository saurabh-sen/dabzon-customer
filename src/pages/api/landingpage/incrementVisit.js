import clientPromise from "../../../../backend/database/connect";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = await client.db("dabzon");
      const collection = await db.collection("incrementVisit");
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const docs = await collection.updateOne(
        { year: currentYear, month: currentMonth },
        { $inc: { count: 1 } },
        { upsert: true }
      );
      if (docs.acknowledged) {
        return res
          .status(200)
          .json({
            allData: docs,
            msg: "successfully fetched all category data",
          });
      } else {
        return res
          .status(501)
          .json({ allData: "", msg: "cannot update visitor count" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ allData: "", msg: error });
    }
  }
}
