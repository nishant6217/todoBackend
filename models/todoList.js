const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    id:{
        type:String,
        required:true,
        unique: true,
    }
},{
    timestamps: true
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;
