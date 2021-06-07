//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/anurag';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

//Mongoose 4 relied on its own promise implementation, its a legacy code which is not required from Mongoose 5
// Mongoose 5 will use native promises by default (or bluebird if native promises are not present)
module.exports = mongoose;
