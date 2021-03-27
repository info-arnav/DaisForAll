import { ObjectID } from "bson";
import { connectToDatabase } from "../../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .find({ _id: ObjectID(id) })
    .toArray();
  const image_string = posts[0].image;
  const im = image_string.split(",")[1];
  const img = Buffer.from(im, "base64");
  res.writeHead(200, {
    "Content-Type": "image/webp",
    "Content-Length": img.length,
  });
  res.end(img);
};
