import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId, ObjectID } from "bson";
export default async (req, res) => {
  if ((req.metod = "post")) {
    const { db } = await connectToDatabase();
    const { id } = req.body.username;
    const posts = await db
      .collection("posts")
      .aggregate([
        { $match: { bookmarks: req.body.username } },
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
  } else {
    res.json([{ error: true }]);
  }
};
