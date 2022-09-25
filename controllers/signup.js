const Person = require("../models/individualPerson");
const { returnStatement } = require("../commonFunctions/commonReponse");
const logger = require("../logger");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    let user = await Person.findOne({ email: email });
    if (user) {
      logger.error(`user already exists`);
      return returnStatement("User Alreday exists", false, "", 422, req, res);
    } else {
      let user = await Person.create({
        email: email,
        name: name,
        password: password,
      });
      logger.info(`user created`);
      return returnStatement("User Created", true, user, 200, req, res);
    }
  } else {
    logger.error(`Please provide all required fields`);
    return returnStatement(
      "Please provide all required fields",
      false,
      "",
      422,
      req,
      res
    );
  }
};
