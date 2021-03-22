import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  await db.collection("posts").insertOne({ name: "sample" });
  const posts = await db
    .collection("posts")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(posts);
};
