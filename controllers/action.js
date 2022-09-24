const Person = require("../models/individualPerson");
const Todo = require("../models/todoList")


module.exports.todoFun = async (req, res) => {
    const { createdBy, status, id, name } = req.body;
    let guy = await Person.findOne({ email: createdBy });
    try {
        if(!guy) {
            return res.status(400).json({
                message: `No Person with Provided Email`,
                success: false
            })
        }
        if (createdBy, status, id, name) {
            let todo = await Todo.findOne({ id: id });
            if (!todo) {
                const a = await Todo.create({
                    status: status,
                    id: id,
                    name: name,
                    createdBy: guy._id
                });
                if (a) {
                    return res.status(200).json({
                        message: `Todo Created`,
                        success: true
                    })
                } else {
                    return res.status(400).json({
                        message: `Internal Server Error while todo Creation`,
                        success: false
                    });
                }
            } else {
                const todoUpdate = await Todo.findByIdAndUpdate(todo._id, {
                    status: status,
                    id: id,
                    name: name,
                    createdBy: guy._id
                })
                if (todoUpdate) {
                    return res.status(200).json({
                        message: `Todo Updated`,
                        success: true
                    })
                } else {
                    return res.status(400).json({
                        message: `Internal Server Error while todo updation`,
                        success: false
                    });
                }
            }
        } else {
            return res.status(400).json({
                message: `Please provide all fields`,
                success: false
            });
        }
    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            message: `Internal Server Error`,
            error: error
        });
    }
}


module.exports.deleteTodo = async(req,res) =>{
    const {id} = req.body;
    if(id){
        let todo = await Todo.findOne({id:id})
        if(todo){
            const a =await Todo.findByIdAndDelete(todo._id)
            if (a) {
                return res.status(200).json({
                    message: `Todo deleted`,
                    success: true
                })
            } else {
                return res.status(400).json({
                    message: `Internal Server Error while todo deletion`,
                    success: false
                });
            }
        }else{
            return res.status(400).json({
                message: `No Todo found to be deleted`,
                success: false
            });
        }
    }else{
        return res.status(400).json({
            message: `Please provide all fields`,
            success: false
        });
    }
}