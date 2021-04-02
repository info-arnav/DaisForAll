var request = require("request");
var { google } = require("googleapis");
var key = require("./service_account.json");
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null,
  key.private_key_id
);
export default (req, res) => {
  if (req.metod == "POST") {
    jwtClient.authorize(function (err, tokens) {
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
          url: `https://www.arnavgupta.net${req.body.url}`,
          type: "URL_UPDATED",
        },
      };
      request(options, function (error, response, body) {
        if (error) {
          res.send("Error");
        }
        res.send("done");
      });
    });
  } else {
    res.send("error");
  }
};
