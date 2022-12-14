const Person = require("../models/individualPerson");
const Todo = require("../models/todoList");
const { returnStatement } = require("../commonFunctions/commonReponse");
const logger = require("../logger");

module.exports.todoFun = async (req, res) => {
  const { status, name, id } = req.body;
  const user = req.user;
  try {
    if (id && status && name) {
      const todoUpdate = await Todo.update(
        { _id: id, createdBy: user._id },
        {
          status: status,
          name: name,
        }
      );
      if (todoUpdate) {
        logger.info(`Todo Updated`)
        return returnStatement("Todo Updated", true, "", 200, req, res);
      } else {
        logger.error(`No todo found for updation`)
        return returnStatement(
          "No Such todo found for updation",
          false,
          "",
          400,
          req,
          res
        );
      }
    } else if (status && name) {
      const a = await Todo.create({
        status: status,
        name: name,
        createdBy: user._id,
      });
      if (a) {
        logger.info(`Todo created`)
        return returnStatement("Todo Created", true, "", 200, req, res);
      } else {
        logger.error(`Error while todo creation`)
        return returnStatement(
          "Error while todo Creation",
          false,
          "",
          400,
          req,
          res
        );
      }
    } else {
      logger.error(`Please provide all required fields`)
      return returnStatement(
        "Please provide all required fields",
        false,
        "",
        422,
        req,
        res
      );
    }
  } catch (error) {
    logger.error(`Internal Server error, ${error}`)
    return returnStatement("Internal Server Error", false, "", 500, req, res);
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const user = req.user;
      const deleteTodo = await Todo.deleteOne({ _id: id, createdBy: user._id });
      if (deleteTodo.deletedCount == 1) {
        logger.info(`todo deleted`)
        return returnStatement("Todo deleted", true, "", 200, req, res);
      } else {
        logger.error(`No todo present`)
        return returnStatement("No Todo Present", false, "", 400, req, res);
      }
    } else {
      logger.error(`please provide all details`)
      return returnStatement(
        "Please provide all details",
        false,
        "",
        400,
        req,
        res
      );
    }
  } catch (error) {
    logger.error(`Internal server error, ${error}`)
    return returnStatement("Internal Server Error", false, "", 500, req, res);
  }
};

module.exports.getTodo = async function (req, res) {
  try {
    const user = req.user;
    const todos = await Todo.find({ createdBy: user._id });
    if (todos) {
      logger.info(`todos found`)
      return returnStatement(
        `Todos Found for ${user.email}`,
        true,
        todos,
        200,
        req,
        res
      );
    } else {
      logger.error(`no todos found`)
      return returnStatement(
        `No Todos found for ${user.email}`,
        false,
        "",
        400,
        req,
        res
      );
    }
  } catch (error) {
    logger.error(`Internal server error`)
    return returnStatement(`Internal Server error`, false, "", 500, req, res);
  }
};
