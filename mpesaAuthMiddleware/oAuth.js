// MPesa SandBox Access Token Middleware

const axios = require("axios");
const { consumer_key, consumer_secret } = require("../config");

const oAuth = async (req, res, next) => {
  const auth =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const response = await axios({
      method: "Get",
      url,
      headers: {
        Authorization: auth,
      },
    });

    req.token = response.data.access_token;
    next();
  } catch (err) {
    if (err) console.error(err.message);
    res.status(401).send("Authorization Failed");
  }
};

module.exports = oAuth;
