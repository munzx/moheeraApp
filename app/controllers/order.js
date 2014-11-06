'use strict';

//Dependencies
var mongoose = require('mongoose'),
	_ = require('lodash'),
	products = require('../models/product'),
	users = require('../models/user');

//Return with all orders for a certain product
module.exports.index = function(req, res){
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			res.status(200).jsonp(product.order);
		} else {
			res.status(404).jsonp('No order has been found');
		}
	});
}

module.exports.getById = function (req, res) {
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			var order = product.order.id(req.params.orderId);
			if(order){
				res.status(200).jsonp(order);
			} else {
				res.status(404).json('Order has not been found');
			}
		} else {
			res.status(404).json('Product not found');
		}
	});
}

//Create a new order for a certain product
module.exports.create = function(req, res){
	var orderInfo = req.body;
	orderInfo.user = req.user;

	//find the product then add new order to it
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			product.order.push(orderInfo);
			product.save(function (err, order) {
				if(err){
					res.status(500).jsonp(err);
				} else if(order){
					res.status(200).jsonp(order);
				} else {
					res.status(401).jsonp('Failed to add order');
				}
			});
		} else {
			res.status(404).jsonp('Product has not been found');
		}
	});
}

//Update a specific product order
module.exports.update = function(req, res){
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			var order = product.order.id(req.params.orderId);
			order = _.extend(order, req.body);
			product.save(function (err, updatedOrder) {
				if(err){
					res.status(500).jsonp(err);
				} else if(order){
					res.status(200).jsonp(updatedOrder);
				} else {
					res.status(401).jsonp('Failed to update order info');
				}
			});
		} else {
			res.status(404).jsonp('Product has not been found');
		}
	});
}

//Delete a specific product and a specific order
module.exports.delete = function(req, res){
	products.findById(req.params.id, function (err, product) {
		var order = product.order.id(req.params.orderId).remove();
		order.save(function (err) {
			if(err){
				res.status(500).jsonp(err);
			} else {
				res.status(200).jsonp('order has been deleted successfully');
			}
		});
	});
}