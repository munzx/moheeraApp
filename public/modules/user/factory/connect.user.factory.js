'use strict';

angular.module('userModule').factory('connectUserFactory', ['$resource', function ($resource) {
	return $resource('/user/:action/:byUserName',
		{
			name: "@byUserName",
			action: "@action"
		},
		{
			"update": {
				method:"PUT"
			}
		});
}]);