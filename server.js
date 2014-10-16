var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	methodOverride = require('method-override'),
	busboy = require('connect-busboy'),
	app = express();

//connect to database
mongoose.connect('mongodb://localhost/test');

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


//check if mongodb is connected
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection Error:'));
db.once('open', function callback () {
	//Create user schema
	 var userSchemae = mongoose.Schema({
	 	name: String,
	 	email: String
	 });

	 userSchemae.methods.intro = function () {
	 	var greeting = this.name ? 'my name is ' + this.name : 'call me moe';
	 	console.log(greeting);
	 }

	// //Create user model
	 var user = mongoose.model('user', userSchemae);
	// var munzir = new user({name : 'munzir', email: 'munzir.suliman@moheera.com'});
	// console.log(munzir.name);


	// munzir.save(function (err, munzir) {
	// 	if(err) return console.log(err);
	// 	munzir.intro();
	// });	
	user.find({ 'name': 'munzir'}, function (err, item) {
		if(err) console.log('Error message ' + err);
		console.log(item);
	});
});


app.use('/asset', express.static(__dirname + '/bower_components/'));
app.use('/public', express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/core/views/index.html');
});


app.listen(3000, function () {
	console.log('Bism Allah , Server runs on port 3000');
});