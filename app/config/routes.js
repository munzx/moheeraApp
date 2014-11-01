'use strict';

var users = require('../controllers/user'),
	product = require('../controllers/product'),
	passport = require('passport'),
	passportHttp = require('passport-http'),
	authLocal = require('./auth/local.strategy');


module.exports = function (app) {

	var Auth = passport.authenticate('local');

	//check if user is authinticated
	function ensureAuthenticated(req, res, next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.send(403);
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
		res.redirect('/');
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/api/test', ensureAuthenticated, function(req, res){
		res.json({
			name: 'test',
			name2: 'test2'
		});
	});

	app.get('/api/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	//Users
	app.get('/user', users.index); //get all users
	app.post('/user', users.create); //create a new user
	app.put('/user/:id', users.update); //update user info by id
	app.delete('/user/:id', users.delete); //delete user by id
	app.get('/user/:name', users.getByName); //get a user by name

	//Products
	app.get('/product', product.index); //get all products
	app.post('/product', product.create); //create a new product
	app.put('/product/:id', product.update); //update a product by id
	app.delete('/product/:id', product.delete); //delete a prodcut by id
	app.get('/product/:name', product.getByName); //get a product by name
	app.get('/product/category/:category', product.categoryName); //find products by category name

}
