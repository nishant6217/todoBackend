const express = require("express");

const router = express.Router();
const conRegister = require("../../controllers/signup");

router.post("/register", conRegister.register);

module.exports = router;
