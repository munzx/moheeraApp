'use strict';

//Dependencies
var mongoose = require('mongoose'),
_ = require('lodash'),
errorHandler = require('./error'),
products = require('../models/product'),
users = require('../models/user');

//Return with all orders of a certain user
module.exports.index = function(req, res){
	products.find().where('order.user._id').equals(req.user._id).or([{'user': req.user._id}]).where('order').exists().exec(function (err, product) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product){
			res.status(200).jsonp(product);
		} else {
			res.status(404).jsonp({message: 'No order has been found'});
		}
	});
}

module.exports.getById = function (req, res) {
	products.findById(req.params.id, function (err, product) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product){
			var order = product.order.id(req.params.orderId);
			if(order){
				res.status(200).jsonp({product: product, order: order});
			} else {
				res.status(404).json({message: 'Order has not been found'});
			}
		} else {
			res.status(404).json({message: 'Product not found'});
		}
	});
}

//Create a new order for a certain product
module.exports.create = function(req, res){
	var orderInfo = req.body.info;
	var cartProductIds = '';
	orderInfo.user = req.user;


	//get the ids of all products in the user cart
	var searchCartProductIds = function () {
		var ids=[];
		var userCart = req.user.cart;
		userCart.forEach(function (item) {
			ids.push(item.productId);
		});
		return ids;
	}

	cartProductIds = searchCartProductIds();

	//find products added to the user cart
	products.find({_id: {"$in": cartProductIds }}, function (err, product) {
		var selectedProducts = product,
		productIds = [],
		cartProducts = req.user.cart,
		cartProductsCantBeOrdered = [],
		quantityCheck = '';

		//get the products ids
		selectedProducts.forEach(function (item) {
			productIds.push(item._id);
		});


		//Check the quantity
		selectedProducts.forEach(function (productItem) {
			//Get all "products" references in the cart that have quantity equals or less
			//than the products
			var quantityCheck = _.find(cartProducts, function (item) {
				return item.quantity <= productItem.quantity;
			});

			if(quantityCheck == undefined){
				cartProductsCantBeOrdered.push({"name": productItem.name, "id": productItem._id});
			}
		});

		//get the products in user cart that dosee not exist in the products
		//(i.e if a product creator has deleted a product that a user has added it to his/her cart)
		var difference = _.difference(parseInt(cartProductIds), parseInt(productIds));

		if(cartProductsCantBeOrdered.length > 0 || difference.length > 0){
			res.status(404).jsonp({message: cartProductsCantBeOrdered});
		} else {
			users.findById(req.user._id, function (err, user) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else if(user){
					//Create orders , fill up the order info in each product document in the database
					selectedProducts.forEach(function (productItem) {
						productItem.order.push(orderInfo);
						productItem.save();
					});

					//empty the user cart in the user session
					req.user.cart = [];
					//empty the user cart in the users database
					user.cart = [];
					user.save();
					res.status(200).json({"uCart": user.cart});
				} else {
					res.status(500).jsonp({message: 'User has not been found'});
				}
			});
		}

	});
}

//Update a specific product order
//only the product owner can update the order !!!!
module.exports.update = function(req, res){
	products.findOne({_id: req.params.id, user: req.user._id}, function (err, product) {
		if(err){
			res.status(500).jsonp(err);
		} else if(product){
			var order = product.order.id(req.params.orderId);
			order.statusHistory.push(req.body.statusHistory);
			order.status = req.body.status;
			product.save(function (err, updatedOrder) {
				if(err){
					res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
				} else if(order){
					res.status(200).jsonp(updatedOrder);
				} else {
					res.status(401).jsonp({message: 'Failed to update order info'});
				}
			});
		} else {
			res.status(404).jsonp('Product has not been found');
		}
	});
}

//Delete a specific product and a specific order
module.exports.delete = function(req, res){
	products.findOneAndUpdate({_id: req.params.id}, {$pull: {'order': {'_id': req.params.orderId, 'user._id': req.user._id}} }, function (err) {
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp('order has been deleted successfully');
		}	
	});
}