'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Pease provide the first name',
		trim: true,
		lowercase: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please provide the last name',
		trim: true,
		lowercase: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill the user name field',
		trim: true,
		lowercase: true,
		unique: true,
		sparse: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill the email field',
		trim: true,
		unique: true,
		lowercase: true,
		sparse: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	role: {
		type: String,
		lowercase: true,
		enum: ['user', 'admin'],
		default: ['user']
	},
	created: {
		type: Date,
		default: Date.now
	}
}, {strict: true});

var commentSchema = new Schema({
	content: {
		type: String,
		default: '',
		required: 'Please provide a comment',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	author: [userSchema]
}, {strict: true});

var heartSchema = new Schema({
	user: [userSchema],
	rate: {
		type: String,
		enum: ['1', '2', '3', '4', '5'],
		default: '5',
		required: 'Please rate the product',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

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
	user: [userSchema]
}, {strict: true});

var productSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Fill up the product name',
		trim: true,
		lowercase: true,
		unique: true,
		sparse: true
	},
	desc: {
		type: String,
		default: '',
		required: 'Fill up the product describtion',
		trim: true
	},
	category: {
		type: String,
		enum: ['men', 'women', 'kids', 'gifts', 'books'],
		default: ['men'],
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
	price: {
		type: Number,
		default: '0',
		required: 'Please provide product price',
		trim: true
	},
	order: [orderSchema],
	comment : [commentSchema],
	heart: [heartSchema],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}, {strict: true});


module.exports = mongoose.model('product', productSchema);