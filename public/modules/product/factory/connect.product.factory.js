'use strict';

angular.module('productModule').factory('connectProductFactory', ['$resource', function ($resource) {
	return $resource('/product/:id/:getByName',
			{
				id: "@_id",
				getByName: "@getByName"
			},
			{
				"update": {
					method: 'PUT',	
				}
			}
		);
}]);