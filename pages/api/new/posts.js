import { connectToDatabase } from "../../../util/mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import xml2js from "xml2js";
import algoliasearch from "algoliasearch";
import path from "path";
import axios from "axios";
import getConfig from "next/config";
export default async (req, res) => {
  const client = algoliasearch(
    "8PCXEU15SU",
    "fc652d91b2d6db2718b47254be4c5d6e"
  );
  const index = client.initIndex("dev_BLOGS");
  if (req.method == "POST") {
    const { db } = await connectToDatabase();

    const posts = await db
      .collection("posts")
      .insertOne({
        title: req.body.title,
        username: req.body.username,
        compressed: req.body.compressed,
        tags: req.body.tags.replaceAll("#", " "),
        blog: req.body.blog,
        image: req.body.image,
        imageDescription: req.body.imageDescription,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        bookmarks: [],
        views: [],
        conditions: req.body.conditions,
        computerProgramme: req.body.computerProgramme,
        likes: [],
      })
      .then(async (e) => {
        await db
          .collection("userData")
          .update(
            { username: req.body.username },
            { $push: { posts: e.ops[0]._id } }
          );
        return e;
      })
      .then((e) => {
        index
          .saveObject(
            {
              _id: e.ops[0]._id,
              title: req.body.title,
              username: req.body.username,
              tags: req.body.tags.replaceAll("#", " "),
              blog: req.body.blog,
              image: `https://www.daisforall.com/api/image/${e.ops[0]._id}`,
              imageDescription: req.body.imageDescription,
              dateCreated: new Date(),
              dateUpdated: new Date(),
              bookmarks: [],
              views: [],
              conditions: req.body.conditions,
              computerProgramme: req.body.computerProgramme,
              likes: [],
            },
            { autoGenerateObjectIDIfNotExist: true }
          )
          .then((a) => res.status(200).send(`/article/${e.ops[0]._id}`));
      });
  } else {
    res.status(404).send("error");
  }
};
