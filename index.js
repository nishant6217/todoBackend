const express = require("express");
const app = express();

app.use(express.json());

const db = require("./config/mongoose");
// const JWTStrategy = require("./config/passport-jwt-strategy.js");
app.use("/api", require("./routes/api"));

app.listen(3000, () => {
  console.log("start");
});

module.exports = app;
