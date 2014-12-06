'use strict';

angular.module('productModule').factory('productCategoryFactory', [function () {
	return [
		"men",
		"women",
		"kid"
	];
}]);