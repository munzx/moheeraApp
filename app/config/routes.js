'use strict';

var users = require('../modules/users/controller');

module.exports = function (app) {

	app.get('/', users.index);
	app.get('/:name', users.name);

}
