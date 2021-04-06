import { ObjectID } from "bson";
import { connectToDatabase } from "../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $project: {
          blog: 1,
          title: 1,
          imageDescription: 1,
          tags: 1,
          username: 1,
          condition: 1,
          computerProgramme: 1,
        },
      },
    ])
    .limit(parseInt(id))
    .toArray()
    .then((e) => res.json(e));
};
