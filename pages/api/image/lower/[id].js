import { ObjectID } from "bson";
import { connectToDatabase } from "../../../../util/mongodb";
import jimp from "jimp";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;
  const posts = await db
    .collection("posts")
    .aggregate([
      { $match: { _id: ObjectID(id) } },
      {
        $project: {
          compressed: 1,
        },
      },
    ])
    .toArray();
  if (posts[0].compressed) {
    const image_string = posts[0].compressed;
    const im = image_string.split(",")[1];
    const img = Buffer.from(im, "base64");
    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  } else {
    const main = await db
      .collection("emergency")
      .aggregate([
        { $match: { _id: ObjectID("60743b3ae474367382c95633") } },
        {
          $project: {
            compressed: 1,
          },
        },
      ])
      .toArray();
    const image_string = main[0].compressed;
    const im = image_string.split(",")[1];
    const img = Buffer.from(im, "base64");
    res.writeHead(200, {
      "Content-Type": "image/webp",
      "Content-Length": img.length,
    });
    res.end(img);
  }
};
