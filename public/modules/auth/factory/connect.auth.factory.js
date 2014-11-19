'use strict';

angular.module('authModule').factory('connectAuthFactory', ['$resource', function ($resource) {
		return $resource('http://localhost:3000/user',
		{}, 
		{
			query: {method: 'GET'},
			post: {method:'POST'},
			update: {method:'PUT'},
			remove: {method:'DELETE'}
		});
}]);