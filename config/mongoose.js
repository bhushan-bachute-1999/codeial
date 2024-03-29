const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to DB'));

db.once('open', function () {
    console.log("Connected to database : Mongodb");
});

// module.exports = db;