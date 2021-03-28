import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .find({ _id: ObjectID(id) })
    .toArray();
  posts.images = [];
  posts.image = "";
  if (posts.length != 0) {
    res.json(posts);
  } else {
    res.json([{ error: true }]);
  }
};
