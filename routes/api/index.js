const express = require("express");
const { authenticate } = require("../../config/authentication");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/signup", require("./signup"));
router.use("/action", authenticate, require("./action"));

module.exports = router;
