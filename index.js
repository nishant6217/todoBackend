const express = require("express");
const app = express();

app.use(express.json());

const db = require("./config/mongoose");
app.use("/api", require("./routes/api"));

app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});

module.exports = app;
