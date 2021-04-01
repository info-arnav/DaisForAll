import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  if (id.length == 24) {
    const posts = await db
      .collection("posts")
      .find({ _id: ObjectID(id) })
      .toArray()
      .catch((e) => res.json([{ error: true }]));
    posts.images = [];
    if (posts.length != 0) {
      res.json(posts);
    } else {
      res.json([{ error: true }]);
    }
  } else {
    res.json([{ error: true }]);
  }
};
