'use strict';

//Module dependencies
var logger = require('express-logger'),
	errorHandler = require('errorhandler'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	multer  = require('multer'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	passport = require('passport'),
	passportLocal = require('passport-local'),
	env = process.env.NODE_ENV;

module.exports = function (app, express) {

	if(env === 'production'){
		//Connect to mongoDB production
		mongoose.connect('mongodb://localhost/moheeradb');
		console.log('Production Environment');
	} else if(env === 'development'){
		console.log('Development Environment');
		//Connect to mongoDB testing
		mongoose.connect('mongodb://localhost/test');
		//Disable the caching
		app.disable('view cache');
		//stop Etag
		app.disable('etag');
		//Log file location
		app.use(logger({path: "log.txt"}));
		//configure error
	    app.use(errorHandler({
	        dumpExceptions: true,
	        showStack: true
	    }));
	    app.use(errorHandler());
	}

	//check if mongodb is connected otherwise throw an error
	var db = mongoose.connection;
	db.on('error',console.error.bind(console, 'connection Error:'));

	//Set app defaults
	app.disable('x-powered-by'); //Dont show that this server runs express!
	app.set('env','development'); //We are in development mode
	app.disable('case sensitive routing');
	app.enable('strict routing');
	app.set('view engine', 'ejs');
	app.enable('view cache');

	//use middlewears
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(multer({ dest: './public/uploads/'}));
	app.use(cookieParser()); //read cookies
	app.use(session({ secret: process.env.SESSION_SECRET || 'secret', saveUninitialized: false, resave: false})); //use sessions for Auth
	app.use(methodOverride()); //read about this
	app.use(passport.initialize()); //initialize passport
	app.use(passport.session()); // persistent login sessions

	//Publically accessable folders
	app.use('/asset', express.static('./bower_components/'));
	app.use('/public', express.static('./public/'));
}