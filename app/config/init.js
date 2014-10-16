'use strict';

//Module dependencies
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	methodOverride = require('method-override'),
	busboy = require('connect-busboy'),
	app = express();


//Connect to the mongoDB
mongoose.connect('mongodb://localhost/test');
//check if mongodb is connected otherwise throw an error
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection Error:'));

//Set app defaults
app.disable('x-powered-by'); //Dont show that this server runs express!
app.set('env','development'); //We are in development mode
app.disable('case sensitive routing');
app.enable('strict routing');
app.enable('view cache');

//use middlewear
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride()); //read about this
app.use(busboy());


module.exports = app;