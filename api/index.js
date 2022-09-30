const express = require("express");
const authorize = require("./authorize");
const getCardDetails = require("./controllers/getCardDetails");

require("dotenv").config();

const app = express();

app.get("/user/login/callback", authorize);
app.get("/user/:username", getCardDetails);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Example app listening at http://localhost:5000");
});
