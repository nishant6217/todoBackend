const JWT = require("jsonwebtoken");
const Person = require("../models/individualPerson");

const JWT_PRIVATE_KEY = "sjdfhiuhfijsdjfgheripipu98thrjeo8th";

module.exports.generateToken = async function (userEmail) {
  return JWT.sign(
    {
      data: { email: userEmail },
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    JWT_PRIVATE_KEY
  );
};

module.exports.authenticate = async function (req, res, next) {
  try {
    const token = req.headers.token || "";
    const data = JWT.verify(token, JWT_PRIVATE_KEY);

    const user = await Person.findOne({ email: data.data.email });
    if (!user) return res.sendStatus(401);

    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
