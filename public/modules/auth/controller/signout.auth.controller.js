'user strict';

angular.module('authModule').controller('signoutAuthController', ['registerUserConfigFactory', '$http', '$location', function (registerUserConfigFactory, $http, $location) {
	$http.get('/logout')
	.success(function (data, success) {
		registerUserConfigFactory.clearUserInfo();
		$location.path('/home');
	});
}]);