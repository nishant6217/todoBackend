const Person = require("../models/individualPerson");
const Todo = require("../models/todoList");
const { generateToken } = require("../config/authentication");
const { returnStatement } = require("../commonFunctions/commonReponse");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      let guy = await Person.findOne({ email: email });
      if (!guy || guy.password != password) {
        return res
          .status(422)
          .json({ success: false, message: "invalid username or password" });
      }
      const token = await generateToken(email);
      return returnStatement(
        "login successful here is your token keep it safe !!",
        true,
        token,
        200,
        req,
        res
      );
    } else {
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
    return returnStatement("Internal Server Error", false, "", 500, req, res);
  }
};
