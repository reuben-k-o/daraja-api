const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../mpesaAuthMiddleware/auth");

// Route - api/lnm
// Desc - Get Auth Token

router.get("/", auth, (req, res) => {
  res.status(200).json({ token: req.token });
});

// Route - api/lnm
// Description - Lipa na Mpesa Simulation

router.post("/", auth, async (req, res) => {
  const shortcode = "174379";
  const oAuth = "Bearer " + req.token;
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );
  const callBackUrl = "https://9639-197-176-229-39.ngrok.io/api/lnm/callback";
  const accountRef = "reuben";
  const transactionDesc = "LNM API Test";

  const { amount, phoneNumber } = req.body;

  try {
    const config = {
      headers: {
        Authorization: oAuth,
      },
    };

    const json = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callBackUrl,
      AccountReference: accountRef,
      TransactionDesc: transactionDesc,
    };

    const response = await axios.post(url, json, config);

    res.status(200).json(response.data);
  } catch (error) {
    if (error) console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Route - api/test/callback
// Desc - Recieve response from Mpesa

router.post("/callback", (req, res) => {
  console.log("...........Data Recived from Mpesa.........");
  console.log(req.body);
  console.log("...........................................");
});

module.exports = router;
