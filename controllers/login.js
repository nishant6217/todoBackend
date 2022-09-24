const Person = require("../models/individualPerson");
const Todo = require("../models/todoList")
const jwt = require("jsonwebtoken");


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
            let todos = await Todo.find({},{
                "name": 1,
                "status": 1
             }).populate("createdBy")
            console.log(todos)
            let todoData =[];

            todos.map((item)=>{

                item.createdBy.email == email && todoData.push(item)
            })
            let returnObject = {
                success: true,
                message: "login successful here is your token keep it safe !!",
                data: {
                    token: jwt.sign(guy.toJSON(), "person", { expiresIn: "12d" }),
                    todos: todoData
                },
            }
            return res.status(200).json(returnObject);
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Please provide required fields" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: `Internal Server Error`,
            error: error
        });
    }
}


