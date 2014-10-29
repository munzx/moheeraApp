'use strict';

var users = require('../controllers/user');
var product = require('../controllers/product');


module.exports = function (app) {

	//Users
	app.get('/user', users.index); //get all users
	app.post('/user', users.create); //create a new user
	app.put('/user/:id', users.update); //update user info by id
	app.delete('/user/:id', users.delete); //delete user by id
	app.get('/user/:name', users.getByName); //get a user by name


	app.get('/product', product.index); //get all products
	app.post('/product', product.create); //create a new product
	app.put('/product/:id', product.update); //update a product by id
	app.delete('/product/:id', product.delete); //delete a prodcut by id
	app.get('/product/:name', product.getByName); //get a product by name
	app.get('/product/category/:category', product.categoryName); //find products by category name

}
