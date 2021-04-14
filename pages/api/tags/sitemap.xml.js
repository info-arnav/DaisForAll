import { connectToDatabase } from "../../../util/mongodb";
import xml from "xml";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $project: { tags: 1 },
      },
    ])
    .toArray()
    .then(async (e) => {
      const array = [];
      e.map((e) =>
        e.tags
          .split("#")
          .join(" ")
          .split(" ")
          .map((e) => e && array.indexOf(e) == -1 && array.push(e))
      );
      return array;
    })
    .then(async (e) => {
      let a = await e.map((e) => {
        return {
          url: [{ loc: `https://www.daisforall.com/tags/${e}` }],
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
