import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  const users = await db
    .collection("userData")
    .findOne({ username: id })
    .catch((e) => res.json([{ error: true }]));
  if (users) {
    users.images = [];
    users.profiles = [];
    users.usernames = [];
    users.password = "";
    users.email = "";
    users.name = "";
    users.passwords = [];
    res.json(users);
  } else {
    res.json([{ error: true }]);
  }
};
