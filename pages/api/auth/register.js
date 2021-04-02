import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import xml2js from "xml2js";
import axios from "axios";
export default async (req, res) => {
  if (req.method == "POST") {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        req.body.password = hash;
        const { db } = await connectToDatabase();
        let username = await db
          .collection("userData")
          .find({ username: req.body.username })
          .limit(1)
          .count();
        if (username == 0) {
          let email = await db
            .collection("userData")
            .find({ email: req.body.email })
            .limit(1)
            .count();
          if (username == 0 && email == 0) {
            let data = await db
              .collection("userData")
              .insertOne({
                username: req.body.username.toLowerCase(),
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                image: "",
                images: [""],
                dateCreated: new Date(),
                dateUpdated: new Date(),
                profile: "",
                profiles: [""],
                passwords: [req.body.password],
                usernames: [req.body.username],
                followers: [],
                following: [],
                bookmarked: [],
                posts: [],
                viewedPosts: [],
                viewedProfiles: [],
                tags: [],
                viewedTypes: [],
                liked: [],
              })
              .then((e) => {
                return e;
              })
              .then((e) => {
                axios.post("/api/google/update", {
                  url: `/user/${e.ops[0].username}`,
                });
                return e;
              })
              .then((e) => {
                fs.readFile(
                  path.resolve("./public", "sitemap.xml"),
                  "utf-8",
                  (err, data) => {
                    if (err) {
                      throw err;
                    }
                    xml2js.parseString(data, (err, result) => {
                      if (err) {
                        throw err;
                      }
                      const postgres = {
                        loc: `https://www.arnavgupta.net/user/${e.ops[0].username}`,
                      };
                      result.urlset.url.push(postgres);
                      const builder = new xml2js.Builder();
                      const xml = builder.buildObject(result);
                      fs.writeFile(
                        path.resolve("./public", "sitemap.xml"),
                        xml,
                        (err) => {
                          if (err) {
                            throw err;
                          } else {
                            res.status(200).json([
                              {
                                _id: e.ops[0]._id,
                                username: e.ops[0].username,
                              },
                            ]);
                          }
                        }
                      );
                    });
                  }
                );
              });
          } else {
            res.send("error");
          }
        } else {
          res.send("error");
        }
      });
    });
  } else {
    res.status(202).json("error");
  }
};
