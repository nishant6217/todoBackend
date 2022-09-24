const express = require("express");

const router = express.Router();
const conLogin = require("../../controllers/login")

router.post("/login", conLogin.login);

module.exports = router;
