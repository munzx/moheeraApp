'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Create the schema
var usersSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill the user name field',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill the email field',
		trim: true
	}
});

mongoose.model('users', usersSchema);