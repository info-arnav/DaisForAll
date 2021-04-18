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
        { $project: { username: 1, likes: 1 } },
      ])
      .limit(1)
      .toArray();

    if (posts[0].likes.indexOf(req.body.username) == -1) {
      await db
        .collection("posts")
        .update(
          { _id: ObjectId(req.body.post) },
          { $push: { likes: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $push: {
                    following: req.body.post,
                  },
                }
              )
              .then((e) => res.status(200).send("like"))
        );
    } else {
      await db
        .collection("posts")
        .update(
          { _id: ObjectId(req.body.post) },
          { $pull: { likes: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $pull: {
                    likes: req.body.post,
                  },
                }
              )
              .then((e) => res.status(200).send("unlike"))
        );
    }
  } else {
    res.status(404).send("error");
  }
};
