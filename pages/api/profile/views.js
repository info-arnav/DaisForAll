import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcryptjs";
export default async (req, res) => {
  if (req.method == "POST") {
    const { db } = await connectToDatabase();
    await db
      .collection("userData")
      .update(
        { username: req.body.id },
        {
          $push: {
            viewedProfiles: {
              date: new Date(),
              someOneElseViewedYourProfile: req.body.user,
            },
          },
        }
      )
      .then((e) => res.status(200).send("done"));
  } else {
    res.status(404).send("error");
  }
};
