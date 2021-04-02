var request = require("request");
var { google } = require("googleapis");
var key = require("./service_account.json");
export default (req, res) => {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    "./service_account.json",
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null,
    key.private_key_id
  );
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
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
        url: "https://www.arnavgupta.net/",
        type: "URL_UPDATED",
      },
    };
    request(options, function (error, response, body) {
      res.send(body);
    });
  });
};
