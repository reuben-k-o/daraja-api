const express = require("express");
const router = express.Router();
const axios = require("axios");
const oAuth = require("../mpesaAuthMiddleware/oAuth");

// Route         api/c2b
// Type          Get
// Access        Private
// Desc          Get Access Token

router.get("/", oAuth, (req, res) => {
  if (!req.token) return res.status(401).send("Authorization Failed");
  res.status(200).json({ token: req.token });
});

// Route         api/c2b/register_urls
// Type          Get
// Access        Private
// Desc          Register Validation and Confirmation URLs

router.get("/register_urls", oAuth, async (req, res) => {
  if (!req.token) {
    return res.status(401).send("No token, Authorization Failed");
  }
  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  const auth = "Bearer " + req.token;

  const config = {
    headers: {
      Authorization: auth
    }
  };

  const json = {
    ShortCode: "603018",
    ResponseType: "Completed",
    ConfirmationURL: "https://a603242d.ngrok.io/api/c2b/confirmation",
    ValidationURL: "https://a603242d.ngrok.io/api/c2b/validation"
  };

  try {
    const response = await axios.post(url, json, config);
    res.status(200).json(response.data);
  } catch (err) {
    if (err) console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Route                api/c2b/validation
// Type                 Post
// Access               Public
// Desc                 Receives data from Mpesa for Validation

router.post("/validation", (req, res) => {
  const response = {
    ResponseCode: "0000",
    ResponseDesc: "success"
  };

  console.log("............Validation Data from Mpesa..........");
  console.log(req.body);
  console.log("................................................");

  res.json(response);
});

// Route                api/c2b/confirmation
// Type                 Post
// Access               Public
// Desc                 Receives data from Mpesa for confirmation

router.post("/confirmation", (req, res) => {
  const response = {
    ResponseCode: "0000",
    ResponseDesc: "success"
  };

  console.log("............Confirmation Data from Mpesa..........");
  console.log(req.body);
  console.log("................................................");

  res.status(200).json(response);
});

// Route                api/c2b/simulate
// Type                 Get
// Access               Private
// Desc                 Simulate a C2B Mpesa Api transaction

router.get("/simulate", oAuth, async (req, res) => {
  if (!req.token) return res.status(401).send("No Token, Authorization Failed");

  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
  const auth = "Bearer " + req.token;

  const config = {
    headers: {
      Authorization: auth
    }
  };

  const json = {
    ShortCode: "603018",
    CommandID: "CustomerPayBillOnline",
    Amount: "100",
    Msisdn: "254708374149",
    BillRefNumber: "timothy"
  };

  try {
    const response = await axios.post(url, json, config);
    res.status(200).json(response.data);
  } catch (err) {
    if (err) console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
