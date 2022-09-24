
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nishant2422:nishant2422@cluster0.qlftlju.mongodb.net/test?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind('error!!'));

db.once('open', function () {
    console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;
