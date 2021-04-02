import request from "request";
import { google } from "googleapis";
import fs from "fs";
import xml2js from "xml2js";
import path from "path";
import { connectToDatabase } from "../../../util/mongodb";
const key = {
  type: "service_account",
  project_id: "infinity-71441",
  private_key_id: "ad476c05348a5fa3cf5440f5cee807a4a89643a1",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQrdr5mWpqQwOq\np156FBRx7frwZQuoDxPjWpInvZ7RyVBOYo+MHLiyys7ejwIXYwF7bE6dSxCD1xUh\nnrsdM1PgO+NWorQh1rf0fm/qB2Gow3OPy5+pSWx7rBtdBrem1296OFh2RbXASlG4\nWzUjWf4EfAc/DNQTiAt84pcDsYbh8X1WOn1/M6hVL6ZfxZJ1hLs1BdPZVqRMe0r6\nuK+YUQNRdBx4fwG0AFuORqIgf+kE6AvuxxrRIJOLGrFTzHy/XJtwTG6nJgORndZd\ns63JJrLPr6X/NKxA+mn4uFH/keFGOPGopFJq1msfEJsV9AlalQB218R3efM2r+zd\n6c9t/WcrAgMBAAECggEATNJ8ByA950Glc2krJDkJL8oC9AXW7TcjxLJ+lMe/VI7O\nlBS/sL6QFi4ISzGNfQuTK5s7M7fDLC39lwNm8gCH08hoUGgUdVKlJQp468hs4OKX\nQ+wb6offuoWpCy2iZXbxEKb2lg/isZgKjppxLQL/uynnxwPTfR87z21hV9g+hiWl\nEvjfHw7RkjeUsbCiwuTUzSqa8rHs0UCGMA88U3HC6YYBf+brjZejslExRNl+HzWa\nMhGEOwhEAxO/FLRHFmKHOpbDdnZhfWw0outkTmJ+iX/QmELeTNkX9gAF2NUE4Bjt\n+ld+Gl5/ILAqQ081zDwNizO20Rq0YYeZPm8xdl+xAQKBgQDuVlwyvBtWfTIjKb/H\nIp+3swBEEwQXzT6HNhNDjJ8QC1v+BYeUXiL1jfqLXn9D3MlHKbF/FA2NXAf3TLeZ\nU5ObBrqQPTfenJvMjbVG0j3ONPV3/Yb3vCkGHdjV7xfvoXbj2CW0CK6we77BeZe/\noPs08a12Kr41nndtq705kbBxAQKBgQDgJNTXmWPfQgmm9KrnNWE8otozGkVKYorU\nHPRyXiZ2iUboIN3kkBbXh/5sNKYWjTIaN2GL1n4MhSkfz8u8HfxqLHZvJwlYcqBd\nqD7hmxTKWn8paqal+tTqM6ynzwUmOU95HNbU5yIa+0TfpghQPvKPvetbgbkhaaPH\ndcf5t65sKwKBgBQKsRAXH1ljh77LOPQ+5h1lcQVIcBSsTrDCDFam0Y1g1yiCQIdq\nbxglC0eC98K2IzrXt7RO9GDJt2XFTr8W9xeXNkMA0tzmYHeQBwlgjo/zhhzD9gCJ\nEw4PnndG9sVQ15WLTIhaHo56qWzNk8QqflVSaVrBd2M84yAWy/+2T5cBAoGBAN/8\njmGhHEeXg3O+3iZMlo30o54bq5CI5vjOsoyzfzZHOn9vkK3+O4VIljvlZO/2S1Id\nc7I9Nxsl2pG6onqrcHldU0ECPnmPmqfdIHFs+xq30ok91ajZ/vjHiMrsutWWwc9i\nvWBmVROncw0XqwkdzmFMRazc9nboTU1eaucl4fyfAoGBAMxtmmQ7FusHmCKLgPIP\nhg7o0YgOKXuwW+SmBG/VG1mmLTlb99Q5uUCNg97C6xaa+VQFqNTaxUYPoxo5qK1N\nLZT6+COEHc2pzYyFJP645xTM5jpcdhJShhO8S2pnonSPMeij2x1uEOuHDnwqVxUF\nu625v/oFUkci1KKGr5uHH0K6\n-----END PRIVATE KEY-----\n",
  client_email: "infinitygod@infinity-71441.iam.gserviceaccount.com",
  client_id: "108993733927960720768",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/infinitygod%40infinity-71441.iam.gserviceaccount.com",
};
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null,
  key.private_key_id
);
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find({}).toArray();
  const array = [];
  posts.map((e) =>
    jwtClient.authorize(async function (err, tokens) {
      if (err) {
        res.send("Error");
        return;
      }
      let options = {
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        auth: { bearer: tokens.access_token },
        json: {
          url: `https://www.arnavgupta.net/article/${e._id}`,
          type: "URL_UPDATED",
        },
      };
      request(options, async function (error, response, body) {
        if (error) {
          res.send("Error");
        }
        fs.readFile(
          path.resolve("public", "sitemap.xml"),
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
                loc: `https://www.arnavgupta.net/article/${e._id}`,
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
                  }
                }
              );
            });
          }
        );
      });
      await new Promise((resolve) => setTimeout(resolve, 10000));
    })
  );
  res.status(404).send(404);
};
