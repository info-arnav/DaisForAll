import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId, ObjectID } from "bson";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    let posts = await db
      .collection("posts")
      .aggregate([
        { $match: { _id: ObjectID(req.body.post) } },
        { $project: { username: 1, bookmarks: 1 } },
      ])
      .limit(1)
      .toArray();

    if (posts[0].bookmarks.indexOf(req.body.username) == -1) {
      await db
        .collection("posts")
        .update(
          { _id: ObjectId(req.body.post) },
          { $push: { bookmarks: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $push: {
                    bookmarked: req.body.post,
                  },
                }
              )
              .then((e) => res.status(200).send("bookmark"))
        );
    } else {
      await db
        .collection("posts")
        .update(
          { _id: ObjectId(req.body.post) },
          { $pull: { bookmarks: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $pull: {
                    bookmarked: req.body.post,
                  },
                }
              )
              .then((e) => res.status(200).send("unbookmark"))
        );
    }
  } else {
    res.status(404).send("error");
  }
};
