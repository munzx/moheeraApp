'user strict';

angular.module('moheera').factory('errorAuthFactory', ['response', '$location', function (response, $location) {
	switch(response){
		case 404:
			$location.path('/login');
			break;
		case 403:
			$location.path('/login');
			break;
		case 500:
			$location.path('/login');
			break;
		default:
			$location.path('/login');
	}
}]);