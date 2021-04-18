import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .aggregate([
      { $match: { username: id } },
      {
        $project: {
          blog: 1,
          title: 1,
          imageDescription: 1,
          tags: 1,
          dateUpdated: 1,
          dateCreated: 1,
          username: 1,
          compressed: 1,
          condition: 1,
          computerProgramme: 1,
        },
      },
    ])
    .toArray();
  if (posts) {
    res.json(posts);
  } else {
    res.json([{ error: true }]);
  }
};
