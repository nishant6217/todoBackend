const express = require("express");

const router = express.Router();
const conTodo = require("../../controllers/action");

router.post("/todo-create-update", conTodo.todoFun);
router.post("/todo-delete", conTodo.deleteTodo);
router.get("/get-todos", conTodo.getTodo);

module.exports = router;
