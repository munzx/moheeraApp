'user strict';

angular.module('authModule').controller('signupAuthController', ['registerUserConfigFactory', '$scope', '$location', 'connectAuthFactory', function (registerUserConfigFactory, $scope, $location, connectAuthFactory) {
	if(registerUserConfigFactory.getUser()) $location.path('/profile');


	$scope.signUp = function () {
		connectAuthFactory.save($scope.credentials, function (data, res) {
			alert(data + ' / ' + res);
		},
		function (data) {
			$scope.error = data.data.errors;
		});
	}

}]);