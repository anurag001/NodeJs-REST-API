const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); 
const app = express();
const users = require('./routes/users');
const home = require('./routes/home');


//default path set for ejs templates to view
app.set("view engine", "ejs");

app.set('secretKey', 'nodeRestApi');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//logger middleware
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect, which domain can request you
    //The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin or not.
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/',home);
app.use('/users', users);


app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something went wrong!"});

});

app.listen(8000, function(){
	console.log('Node server listening on port 8000');
});
