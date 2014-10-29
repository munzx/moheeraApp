'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var productSchema = new Schema({
	name: {
		type: 'string',
		default: '',
		required: 'Fill up the product name',
		trim: true,
		unique: true
	},
	desc: {
		type: 'string',
		default: '',
		required: 'Fill up the product describtion',
		trim: true
	},
	category: {
		type: 'string',
		default: '',
		required: 'Fill up the category',
		trim: true
	}
}, {strict: true});

mongoose.model('product', productSchema);
module.exports = mongoose.model('product');