'use strict';

//Dependencies
var mongoose = require('mongoose'),
	errorHandler = require('./error'),
	products = require('../models/product');


module.exports.index = function(req, res){
	products.find().sort({created: "desc"}).exec(function(err, product){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product) {
			res.status(200).jsonp(product);
		} else {
			res.status(404).json({message: 'No product has been found'});
		}
	});
}

module.exports.create = function(req, res){
	var newProduct = new products(req.body);
	newProduct.user = req.user;
	newProduct.save(function(err, product){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else {
			res.status(200).jsonp(product);
		}
	});
}

module.exports.getByName = function(req, res){
	products.findOne({name: req.params.name}, function(err, product){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product) {
			res.status(200).jsonp(product);
		} else {
			res.status(404).json({message: 'Product has not been found'});
		}
	});
}

//update only if the product creator has the same logged in user id which mean they are the same person
module.exports.update = function(req, res){
	products.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, function(err, product, numOfAffectedRows){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product){
			res.status(200).jsonp(product);
		} else {
			res.status(200).json({message: 'Failed to update document'});
		}
	});
}

//delete only if the product creator has the same logged in user id which mean they are the same person
module.exports.delete = function(req, res){
	products.findOneAndRemove({_id: req.params.id, user: req.user._id}, function(err, numOfAffectedRows){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(numOfAffectedRows === 0){
			res.status(200).json({message: 'Failed to delete document'});
		} else {
			res.status(200).json('successfully deleted the product');
		}
	});
}

module.exports.categoryName = function(req, res){
	products.find({category: req.params.category}, function(err, product){
		if(err){
			res.status(500).jsonp({message: errorHandler.getErrorMessage(err)});
		} else if(product){
			res.status(200).jsonp(product);
		} else {
			res.status(404).json({message: 'No product has been found'});
		}
	});
}