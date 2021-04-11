import { ObjectID } from "bson";
import { connectToDatabase } from "../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("userData")
    .update(
      { username: req.body.username },
      {
        $set: {
          name: req.body.name,
          twitter: req.body.twitter,
          website: req.body.website,
          github: req.body.github,
          facebook: req.body.facebook,
          instagram: req.body.instagram,
          profile: req.body.profile,
        },
      }
    )
    .then(res.json("done"));
};
