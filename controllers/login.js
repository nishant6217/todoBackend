const Person = require("../models/individualPerson");
const Todo = require("../models/todoList");
const { generateToken } = require("../config/authentication");
const { returnStatement } = require("../commonFunctions/commonReponse");
const logger = require("../logger");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      let user = await Person.findOne({ email: email });
      if (!user || user.password != password) {
        logger.error(`invalid username or password`)
        return res
          .status(422)
          .json({ success: false, message: "invalid username or password" });
      }
      const token = await generateToken(email);
      logger.info(`login successful`)
      return returnStatement(
        "login successful here is your token keep it safe !!",
        true,
        token,
        200,
        req,
        res
      );
    } else {
      logger.error(`please provide required fields`)
      return returnStatement(
        "Please provide required fields",
        false,
        "",
        400,
        req,
        res
      );
    }
  } catch (error) {
    logger.error(`internal server error`)
    return returnStatement("Internal Server Error", false, "", 500, req, res);
  }
};
