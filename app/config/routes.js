'use strict';

var users = require('../controllers/user'),
	product = require('../controllers/product'),
	order = require('../controllers/order'),
	passport = require('passport'),
	authLocal = require('./auth/local.strategy');


module.exports = function (app) {

	//Assign variable to rename the PASSPORT local authentication strategy
	var Auth = passport.authenticate('local');

	//check if the user is authinticated
	function ensureAuthenticated(req, res, next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//check if the user role is admin
	function isAdmin(req, res, next){
		if(req.user.role === 'admin'){
			next();
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//check if the user role is user
	//grant the admin an access to any of the user route/controller
	function isUser(req, res, next){
		if(req.user.role === 'user' || req.user.role === 'admin'){
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

	//Serve login page
	app.get('/login', function(req, res){
		res.render('../public/core/views/login', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	});

	//Check login credentials
	app.post('/login', Auth, function(req, res){
		res.status(200).json('Bism Allah');
	});

	//Logout
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
	app.put('/user/:id', ensureAuthenticated, isUser, users.update); //update user info by id
	app.delete('/user/:id', ensureAuthenticated, isUser, users.delete); //delete user by id
	app.get('/user/:name', users.getByName); //get a user by name

	//Products
	app.get('/product', product.index); //get all products
	app.post('/product', ensureAuthenticated, isUser, product.create); //create a new product
	app.put('/product/:id', ensureAuthenticated, isUser, product.update); //update a product by id
	app.delete('/product/:id', ensureAuthenticated, isUser, product.delete); //delete a prodcut by id
	app.get('/product/:name', product.getByName); //get a product by name
	app.get('/product/category/:category', product.categoryName); //find products by category name

	//Orders
	app.get('/product/:id/order', order.index); //get all orders of a product
	app.get('/product/:id/order/:orderId', order.getById); // get a product order by id
	app.post('/product/:id/order', order.create); //create a new product order
	app.put('/product/:id/order/:orderId', order.update); //update a product order
	app.delete('/product/:id/order/:orderId', order.delete); //delete a product order

}
