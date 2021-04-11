import { connectToDatabase } from "../../../util/mongodb";
import xml from "xml";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("userData")
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
          url: [{ loc: `https://www.arnavgupta.net/user/${e.username}` }],
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
