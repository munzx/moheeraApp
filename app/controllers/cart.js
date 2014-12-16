'use strict';

//Dependencies
var mongoose = require('mongoose'),
	_ = require('lodash'),
	errorHandler = require('./error'),
	users = require('../models/user');


module.exports.index = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			res.status(200).jsonp(user.cart);
		} else {
			res.status(404).jsonp({message: 'User has not been found'});
		}
	});
}

module.exports.addProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			var newCart = {
				name: req.body.product.name,
				desc: req.body.product.desc,
				category: req.body.product.category,
				image: req.body.product.image,
				price: req.body.product.price,
				productId: req.params.productId
			};
			user.cart.push(newCart);
			user.save(function (err, userInfo) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else if(newCart){
					res.status(200).jsonp({"cart": userInfo.cart});
				} else {
					res.status(401).json({message: 'Failed to add new product to the cart'});
				}
			});
		} else {
			res.status(404).jsonp({message: 'User has not been found'});
		}
	});
}

module.exports.updateProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			var userCart = user.cart;
			userCart.forEach(function (item) {
				if(item.productId == req.body.product.productId){
					item.quantity = req.body.product.quantity;
				}
			});
			user.save(function (err, cart) {
				if(err){
					res.status(401).jsonp({message: errorHandler.getErrorMessage(err)});
				} else if(cart){
					res.status(200).jsonp({"cart": userCart});
				} else {
					res.status(500).jsonp({message: "Unknown error has occured"});
				}
			});
		} else {
			res.status(404).jsonp({message: "User has not been found"});
		}
	})	
}

module.exports.removeProduct = function (req, res) {
	users.findById(req.user._id, function (err, user) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(user){
			var cartInfo = user.cart;
			cartInfo.forEach(function (item) {
				if(req.params.productId == item.productId){
					item.remove();
				}
			});
			user.save(function (err, userInfo) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else {
					res.status(200).json({"cart": userInfo.cart});
				}
			})
		} else {
			res.status(404).json({message: 'User has not been found'});
		}
	});
}
