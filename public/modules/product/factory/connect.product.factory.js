'use strict';

angular.module('productModule').factory('connectProductFactory', ['$resource', function ($resource) {
	return $resource('/product/:action/:id/:getByName/:categoryName',
			{
				id: "@_id",
				action: "@action",
				categoryName: "@categoryName",
				getByName: "@getByName"
			},
			{
				"update": {
					method:"PUT",
					withCredentials: true,
					headers: {'Content-Type': undefined },
					transformRequest: angular.identity
				},
				"save": {
					method:"POST",
					withCredentials: true,
					headers: {'Content-Type': undefined },
					transformRequest: angular.identity
				}
			}
		);
}]);