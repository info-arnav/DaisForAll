import { connectToDatabase } from "../../../util/mongodb";
import xml from "xml";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $project: {
          username: 1,
        },
      },
    ])
    .toArray()
    .then(async (e) => {
      let a = await e.map((e) => {
        return {
          url: [{ loc: `https://www.infinity.cyou/en-nl/article/${e._id}` }],
        };
      });
      return a;
    })
    .then((e) => {
      e.push({
        _attr: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
      });
      return e;
    })
    .then((e) =>
      res.send(
        xml(
          [
            {
              urlset: e,
            },
          ],
          {
            declaration: {
              standalone: "yes",
              encoding: "UTF-8",
            },
          }
        )
      )
    );
};
