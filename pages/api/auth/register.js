import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcrypt";
export default async (req, res) => {
  if (req.methos == "POST") {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      req.body.password = hash;
    });
    const { db } = await connectToDatabase();
    let username = await db
      .collection("userData")
      .find({ username: req.body.username })
      .limit(1)
      .count();
    if (username == 0) {
      let email = await db
        .collection("userData")
        .find({ email: req.body.email })
        .limit(1)
        .count();
      if (username == 0 && email == 0) {
        let data = await db.collection("userData").insertOne({
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
        });
        let finalData = await db
          .collection("userData")
          .find({ username: req.body.username })
          .limit(1)
          .toArray();
        await res.status(200).json(finalData);
      } else {
        res.status(202).json("email exists");
      }
    } else {
      res.status(202).json("username exists");
    }
  } else {
    res.status(202).json("error");
  }
};
