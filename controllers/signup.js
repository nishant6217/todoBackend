const Person = require("../models/individualPerson");
const { returnStatement } = require("../commonFunctions/commonReponse");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    let user = await Person.findOne({ email: email });
    if (user) {
      return returnStatement("User Alreday exists", false, "", 422, req, res);
    } else {
      let user = await Person.create({
        email: email,
        name: name,
        password: password,
      });
      return returnStatement("User Created", true, user, 200, req, res);
    }
  } else {
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
