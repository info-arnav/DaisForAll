import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const users = await db
    .collection("userData")
    .aggregate([
      { $match: { username: id } },
      { $project: { username: 1, profile: 1, name: 1 } },
    ])
    .limit(1)
    .toArray();
  if (users) {
    res.json(users);
  } else {
    res.json([{ error: true }]);
  }
};
