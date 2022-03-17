// Lipa Na Mpesa Access Token Middleware

const axios = require("axios");
const { consumer_key, consumer_secret } = require("../config");

const auth = async (req, res, next) => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios({
      url,
      method: "get",
      headers: {
        Authorization: auth,
      },
    });

    req.token = response.data.access_token;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Authorization Failed");
  }
};

module.exports = auth;
