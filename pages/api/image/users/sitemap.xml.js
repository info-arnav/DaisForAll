import { connectToDatabase } from "../../../../util/mongodb";
import xml from "xml";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("userData")
    .find({})
    .toArray()
    .then(async (e) => {
      let a = await e.map((e) => {
        if (e.image) {
          return {
            url: [
              { loc: `https://www.arnavgupta.net/user/${e.username}` },
              {
                "image:image": [
                  {
                    "image:loc": `https://www.arnavgupta.net/api/image/users/${e.username}`,
                  },
                ],
              },
              { lastmod: `${e.dateUpdated}` },
            ],
          };
        }
      });
      return a;
    })
    .then((e) => {
      e.push({
        _attr: {
          xlms: "http://www.sitemaps.org/schemas/sitemap/0.9",
          "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
        },
      });
      return e;
    })
    .then((e) =>
      res.setHeader("Content-Type", "text/xml").send(
        xml(
          [
            {
              urlset: e,
            },
          ],
          {
            declaration: {
              standalone: "yes",
              encoding: "UTF-16",
            },
          }
        )
      )
    );
};
