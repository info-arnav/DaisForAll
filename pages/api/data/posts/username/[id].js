import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .aggregate([{ $match: { username: id } }])
    .toArray();
  if (posts) {
    res.json(posts);
  } else {
    res.json([{ error: true }]);
  }
};
