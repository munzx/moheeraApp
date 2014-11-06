'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var orderSchema = new Schema({
	address: {
		type: String,
		default: '',
		required: 'Please provide location',
		trim: true
	},
	quantity: {
		type: Number,
		default: 0,
		required: 'Please provide the quantity',
		trim: true
	},
	price: {
		type: String,
		default: '',
		required: 'Please provide the price',
		trim: true
	},
	status: {
		type: String,
		lowercase: true,
		default: 'pendding',
		enum: ['pendding', 'deleivered', 'canceled', 'processing'],
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'user'
	}
}, {strict: true});

var productSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Fill up the product name',
		trim: true,
		lowercase: true,
		unique: true
	},
	desc: {
		type: String,
		default: '',
		required: 'Fill up the product describtion',
		trim: true
	},
	category: {
		type: String,
		default: '',
		lowercase: true,
		required: 'Fill up the category',
		trim: true
	},
	image: {
		type: String,
		default: '',
		required: 'Please provide image',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	order: [orderSchema],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {strict: true});


module.exports = mongoose.model('product', productSchema);