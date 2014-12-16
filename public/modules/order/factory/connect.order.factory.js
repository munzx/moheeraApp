'use strict';

angular.module('orderModule').factory('connectOrderFactory', ['$resource', function ($resource) {
	return $resource('/product/order/:id/:name',
			{
				id: "@id",
				name: "@name"
			}
		);
}]);