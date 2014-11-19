'user strict';

angular.module('authModule').controller('signinAuthController', ['registerUserConfigFactory', '$scope', '$http', '$location', function (registerUserConfigFactory, $scope, $http, $location) {
	$scope.signIn = function () {
		$http.post('/login', $scope.credentials)
		.success(function (data, success) {
			registerUserConfigFactory.setUser(data);
			$location.path('/profile');
		})
		.error(function (data, error) {
			$scope.error = data;
		});
	};
}]);