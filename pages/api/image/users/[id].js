import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const user = await db
    .collection("userData")
    .aggregate([
      { $match: { username: id } },
      {
        $project: {
          image: 1,
        },
      },
    ])
    .toArray();
  const image_string = user[0].image;
  let im;
  let img;
  if (image_string) {
    im = image_string.split(",")[1];
    img = Buffer.from(im, "base64");
  } else {
    let image_string1 = await db
      .collection("emergency")
      .aggregate([
        { $match: { _id: ObjectID("60743b3ae474367382c95633") } },
        {
          $project: {
            userdp: 1,
          },
        },
      ])
      .toArray();
    im = image_string1[0].userdp.split(",")[1];
    img = img = Buffer.from(im, "base64");
  }
  res.end(img);
};
