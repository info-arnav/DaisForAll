import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId, ObjectID } from "bson";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    let users = await db
      .collection("userData")
      .aggregate([
        { $match: { username: req.body.user1 } },
        { $project: { username: 1, followers: 1 } },
      ])
      .limit(1)
      .toArray();
    if (users[0].followers.indexOf(req.body.username) == -1) {
      await db
        .collection("userData")
        .update(
          { username: req.body.user1 },
          { $push: { followers: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $push: { following: req.body.user1 },
                }
              )
              .then((e) => res.status(200).send("added"))
        );
    } else {
      await db
        .collection("userData")
        .update(
          { username: req.body.user1 },
          { $pull: { followers: req.body.username } }
        )
        .then(
          async (e) =>
            await db
              .collection("userData")
              .update(
                { username: req.body.username },
                {
                  $pull: { following: req.body.user1 },
                }
              )
              .then((e) => res.status(200).send("removed"))
        );
    }
  } else {
    res.status(404).send("error");
  }
};
