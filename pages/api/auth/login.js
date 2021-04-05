import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    let userData = await db
      .collection("userData")
      .findOne({ username: req.body.username.toLowerCase() })
      .limit(1)
      .toArray();
    if (userData.length == 0) {
      res.status(202).send("username");
    } else {
      bcrypt.compare(
        req.body.password,
        userData[0].password,
        function (err, result) {
          if (result) {
            res
              .status(200)
              .send([{ _id: userData[0]._id, username: userData[0].username }]);
          } else {
            res.status(202).send("password");
          }
        }
      );
    }
  } else {
    res.status(202).json("error");
  }
};
