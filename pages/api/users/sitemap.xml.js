import { connectToDatabase } from "../../../util/mongodb";
import xml from "xml";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("userData")
    .find({})
    .toArray()
    .then(async (e) => {
      let a = await e.map((e) => {
        return {
          url: [
            { loc: `https://www.arnavgupta.net/user/${e.username}` },
            { lastmod: `${e.dateUpdated}` },
          ],
        };
      });
      return a;
    })
    .then((e) => {
      e.push({
        _attr: { xlms: "http://www.sitemaps.org/schemas/sitemap/0.9" },
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
