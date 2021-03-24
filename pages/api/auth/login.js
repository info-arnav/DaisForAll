import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcrypt";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  let user = await db
    .collection("userData")
    .find({ username: req.body.username })
    .limit(1)
    .count();
  let userData = await db
    .collection("userData")
    .find({ username: req.body.username })
    .limit(1)
    .toArray();
  if (user == 0) {
    res.send("username");
  } else {
    bcrypt.compare(
      req.body.password,
      userData[0].password,
      function (err, result) {
        if (result) {
          res.send(userData);
        } else {
          res.send("password");
        }
      }
    );
  }
};
