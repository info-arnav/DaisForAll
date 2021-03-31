import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    const contact = await db
      .collection("contact")
      .insertOne({
        message: req.body.message,
        email: req.body.email,
        date: new Date(),
      })
      .then((e) => res.status(200).send(`/article/${e.ops[0]._id}`));
  } else {
    res.status(404).send("error");
  }
};
