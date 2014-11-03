'use strict';

var users = require('../controllers/user'),
	product = require('../controllers/product'),
	passport = require('passport'),
	passportHttp = require('passport-http'),
	authLocal = require('./auth/local.strategy');


module.exports = function (app) {

	//Rename PASSPORT AUTH for the local strategy
	var Auth = passport.authenticate('local');

	//check if user is authinticated

	//check if the user role is admin
	function isAdmin(req, res, next){
		if(req.user.role[0] === 'admin'){
			next();
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//check if the user role is user
	function isUser(req, res, next){
		if(req.user.role[0] === 'user' || req.user.role[0] === 'admin'){
			next();
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//Index page
	app.get('/', function(req, res){
		res.render('../public/core/views/index', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	});

	app.get('/login', function(req, res){
		res.render('../public/core/views/login', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	});

	app.post('/login', Auth, function(req, res){
		res.status(200).json('Bism Allah');
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	//check if user is logged in
	app.get('/check', isUser, function(req, res){
		res.status(200).json('logged in');
	});

	//Users
	app.get('/user', users.index); //get all users
	app.post('/user', users.create); //create a new user
	app.put('/user/:id', isUser, users.update); //update user info by id
	app.delete('/user/:id', isUser, users.delete); //delete user by id
	app.get('/user/:name', users.getByName); //get a user by name

	//Products
	app.get('/product', product.index); //get all products
	app.post('/product', isUser, product.create); //create a new product
	app.put('/product/:id', isUser, product.update); //update a product by id
	app.delete('/product/:id', isUser, product.delete); //delete a prodcut by id
	app.get('/product/:name', product.getByName); //get a product by name
	app.get('/product/category/:category', product.categoryName); //find products by category name

}
