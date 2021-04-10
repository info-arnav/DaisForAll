import { connectToDatabase } from "../../../../util/mongodb";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "njwt";
let transporter = nodemailer.createTransport({
  host: "smtp.rediffmailpro.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "info@arnavgupta.net", // generated ethereal user
    pass: "God71441", // generated ethereal password
  },
});
let transporterAlternate = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: "arnav.xx.gupta@gmail.com",
    pass: "Arnav300804",
  },
});
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
            let code = Math.floor(Math.random() * 10000) + 1000;
            transporter.sendMail(
              {
                from: '"Team DaisForAll 👥" <info@arnavgupta.net>',
                to: `info@arnavgupta.net, ${req.body.email}`,
                subject: "Email Verification",
                text: `Your verification Code is ${code}`,
                html: `<b>Your verification Code is ${code}</b>`,
              },
              function (error, info) {
                if (error) {
                  transporterAlternate.sendMail(
                    {
                      from: '"Team DaisForAll 👥" <arnav.xx.gupta@gmail.com>',
                      to: `info@arnavgupta.net, ${req.body.email}`,
                      subject: "Email Verification",
                      text: `Your verification Code is ${code}`,
                      html: `<b>Your verification Code is ${code}</b>`,
                    },
                    function (error, info) {
                      if (error) {
                        res.send("error");
                      } else {
                        res.status(200).json(
                          jwt
                            .create(
                              {
                                code: code,
                              },
                              "ArnavGod30080422020731017817087571441",
                              "HS512"
                            )
                            .compact()
                        );
                      }
                    }
                  );
                } else {
                  res.status(200).json(
                    jwt
                      .create(
                        {
                          code: code,
                        },
                        "ArnavGod30080422020731017817087571441",
                        "HS512"
                      )
                      .compact()
                  );
                }
              }
            );
          } else {
            res.status(202).json("email exists");
          }
        } else {
          res.status(202).json("username exists");
        }
      });
    });
  } else {
    res.status(202).json("error");
  }
};
